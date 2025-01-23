"use client";

import { useEffect, useState } from "react";
import { DEFAULT_VEHICLE_PAGE_SIZE, VehicleResponse } from "@/types/vehicle";
import { useParams, useSearchParams } from "next/navigation";
import vehicleCategories from "@/data/vehicle_categories";

export default function useCategoryProducts() {
  const { slug } = useParams();
  const category = vehicleCategories.filter((item) =>
    item.url.includes(slug as string),
  )[0];

  const [response, setResponse] = useState<VehicleResponse>({
    totalPages: 0,
    totalCount: 0,
    pageNumber: 0,
    pageSize: DEFAULT_VEHICLE_PAGE_SIZE,
    data: [],
  });
  const [requestStatus, setRequestStatus] = useState<{
    loading: boolean;
    error: boolean;
  }>({ loading: true, error: false });
  const sp = useSearchParams();
  const getNextPage = () => {
    setRequestStatus({ loading: true, error: false });
    const controller = new AbortController();
    fetch(
      process.env.NEXT_PUBLIC_DOMAIN +
        "/api/inventory/search?" +
        `${category.apiFilter}&` +
        "PageNumber=" +
        `${response.pageNumber + 1}` +
        "&PageSize=" +
        response.pageSize +
        "&" +
        sp.toString(),
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((res) => {
        setResponse((prevState) => ({
          ...res,
          data: prevState.data.concat(res.data),
        }));
        setRequestStatus({ loading: false, error: false });
      })
      .catch((reason) => {
        if (!(reason instanceof DOMException) || reason.name !== "AbortError") {
          setRequestStatus({ loading: false, error: true });
        }
      });
    return () => {
      controller.abort();
    };
  };
  useEffect(getNextPage, [sp]);

  return { category, response, requestStatus, getNextPage };
}

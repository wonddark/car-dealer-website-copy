import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  appendData,
  getErrorStatus,
  getLoadingStatus,
  getResponse,
  toggleError,
  toggleLoading,
} from "@/redux/features/vehicles.slice";
import dayjs from "dayjs";

export default function useVehiclesInventory() {
  const response = useAppSelector(getResponse);
  const loading = useAppSelector(getLoadingStatus);
  const error = useAppSelector(getErrorStatus);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const sp = new URLSearchParams(searchParams);
  if (searchParams.get("saleDate") !== null) {
    sp.delete("saleDate");
    switch (searchParams.get("saleDate")) {
      case "24h":
        sp.set(
          "SaleDateTo",
          dayjs().add(24, "hours").format("MM/DD/YYYY HH:mm"),
        );
        break;
      case "48h":
        sp.set(
          "SaleDateTo",
          dayjs().add(48, "hours").format("MM/DD/YYYY HH:mm"),
        );
        break;
      case "72h":
        sp.set(
          "SaleDateTo",
          dayjs().add(72, "hours").format("MM/DD/YYYY HH:mm"),
        );
        break;
      case "7d":
        sp.set("SaleDateTo", dayjs().add(7, "days").format("MM/DD/YYYY HH:mm"));
        break;
      case "15d":
        sp.set(
          "SaleDateTo",
          dayjs().add(15, "days").format("MM/DD/YYYY HH:mm"),
        );
        break;
      case "30d":
        sp.set(
          "SaleDateTo",
          dayjs().add(30, "days").format("MM/DD/YYYY HH:mm"),
        );
        break;
      case "3m":
        sp.set(
          "SaleDateTo",
          dayjs().add(3, "months").format("MM/DD/YYYY HH:mm"),
        );
        break;
      case "6m":
        sp.set(
          "SaleDateTo",
          dayjs().add(6, "months").format("MM/DD/YYYY HH:mm"),
        );
        break;
      default:
        break;
    }
  }
  const getNextPage = () => {
    dispatch(toggleLoading());
    const controller = new AbortController();
    fetch(
      process.env.NEXT_PUBLIC_DOMAIN +
        "/api/inventory/search?PageNumber=" +
        `${response.pageNumber + 1}` +
        "&PageSize=" +
        response.pageSize +
        (sp.toString() !== "" ? `&${sp.toString()}` : ""),
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((res) => {
        dispatch(appendData(res));
      })
      .catch((reason) => {
        if (reason instanceof DOMException && reason.name === "AbortError") {
          return null;
        } else {
          dispatch(toggleError());
        }
      });
    return () => {
      controller.abort();
    };
  };
  useEffect(getNextPage, [searchParams]);

  return { response, loading, error, getNextPage };
}

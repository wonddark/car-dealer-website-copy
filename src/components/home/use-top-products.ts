import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { appendData, getResponse } from "@/redux/features/vehicles.slice";

export default function useTopProducts() {
  const response = useAppSelector(getResponse);
  const dispatch = useAppDispatch();
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
        "/api/inventory/search?PageNumber=" +
        `${response.pageNumber + 1}` +
        "&PageSize=" +
        response.pageSize +
        "&" +
        sp.toString(),
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((res) => {
        dispatch(appendData(res));
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

  return { response, requestStatus, getNextPage };
}

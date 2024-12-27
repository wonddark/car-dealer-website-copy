import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  appendData,
  getErrorStatus,
  getIsBestOffer,
  getLoadingStatus,
  getResponse,
  toggleError,
  toggleLoading,
} from "@/redux/features/vehicles.slice";

export default function useVehiclesInventory() {
  const response = useAppSelector(getResponse);
  const isBestOffer = useAppSelector(getIsBestOffer);
  const loading = useAppSelector(getLoadingStatus);
  const error = useAppSelector(getErrorStatus);
  const dispatch = useAppDispatch();
  const sp = useSearchParams();
  const getNextPage = () => {
    dispatch(toggleLoading());
    const controller = new AbortController();
    fetch(
      process.env.NEXT_PUBLIC_DOMAIN +
        "/api/inventory/search?PageNumber=" +
        `${response.pageNumber + 1}` +
        "&PageSize=" +
        response.pageSize +
        (sp.toString() !== "" ? `&${sp.toString()}` : "") +
        (isBestOffer ? "&IsBestOffer=true" : ""),
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
  useEffect(getNextPage, [sp, isBestOffer]);

  return { response, loading, error, getNextPage };
}

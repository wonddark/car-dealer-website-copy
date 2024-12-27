import { useEffect, useState } from "react";
import { Vehicle } from "@/types/vehicle";

export const useBuyNow = () => {
  const [response, setResponse] = useState<{
    data: Vehicle[];
    loading: boolean;
    error: boolean;
  }>({
    data: [],
    loading: true,
    error: false,
  });

  const getNextPage = () => {
    const controller = new AbortController();
    fetch(
      process.env.NEXT_PUBLIC_DOMAIN +
        "/api/inventory/search?HasBuyNowPrice=true&PageNumber=1&PageSize=24",
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((res) =>
        setResponse({
          data: res.data,
          loading: false,
          error: false,
        }),
      )
      .catch((reason) => {
        if (reason instanceof DOMException && reason.name === "AbortError") {
          return null;
        } else {
          setResponse({
            data: [],
            error: true,
            loading: false,
          });
        }
      });
    return () => {
      controller.abort();
    };
  };

  useEffect(getNextPage, []);

  return { response };
};

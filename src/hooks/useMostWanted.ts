import { useEffect, useState } from "react";
import { Vehicle } from "@/types/vehicle";

export const useMostWanted = () => {
  const [response, setResponse] = useState<{
    data: Vehicle[];
    loading: boolean;
    error: boolean;
  }>({ data: [], loading: true, error: false });
  const getData = () => {
    const controller = new AbortController();
    fetch(
      process.env.NEXT_PUBLIC_DOMAIN +
        "/api/inventory/search?PageNumber=1&PageSize=4&IsBestOffer=true",
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((res) => {
        setResponse({ data: res.data, loading: false, error: false });
      })
      .catch((reason) => {
        if (reason instanceof DOMException && reason.name === "AbortError") {
          return null;
        } else {
          setResponse({ data: [], error: true, loading: false });
        }
      });

    return () => {
      controller.abort();
    };
  };

  useEffect(getData, []);
  return { response };
};

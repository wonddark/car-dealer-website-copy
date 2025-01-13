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
  const getNextPageV2 = () => {
    dispatch(toggleLoading());
    const controller = new AbortController();
    const body = JSON.stringify({
      pageNumber: response.pageNumber + 1,
      pageSize: 12,
      ...(searchParams.get("sb") ? { sortBy: searchParams.get("sb") } : {}),
      isDescending: searchParams.get("sd") === "1",
      ...(searchParams.get("q") ? { searchInput: searchParams.get("q") } : {}),
      ...(searchParams.get("b") ? { makes: searchParams.getAll("b") } : {}),
      ...(searchParams.get("m") ? { models: searchParams.getAll("m") } : {}),
      ...(searchParams.get("vt")
        ? { vehicleTypes: searchParams.getAll("vt") }
        : {}),
      ...(searchParams.get("tt")
        ? { titleTypes: searchParams.getAll("tt") }
        : {}),
      ...(searchParams.get("pd")
        ? { primaryDamages: searchParams.getAll("pd") }
        : {}),
      ...(searchParams.get("sd")
        ? { secondaryDamages: searchParams.getAll("sd") }
        : {}),
      ...(searchParams.get("l") ? { locations: searchParams.getAll("l") } : {}),
      ...(searchParams.get("c") ? { colors: searchParams.getAll("c") } : {}),
      ...(searchParams.get("s") ? { condition: searchParams.getAll("s") } : {}),
      ...(searchParams.get("t") ? { type: searchParams.getAll("t") } : {}),
      ...(searchParams.get("yf")
        ? { yearFrom: searchParams.getAll("yf") }
        : {}),
      ...(searchParams.get("yt") ? { yearTo: searchParams.getAll("yt") } : {}),
      ...(searchParams.get("of")
        ? { odometerFrom: searchParams.getAll("of") }
        : {}),
      ...(searchParams.get("ot")
        ? { odometerTo: searchParams.getAll("ot") }
        : {}),
      ...(searchParams.get("an") ? { auction: searchParams.getAll("an") } : {}),
      ...(searchParams.get("as") ? { state: searchParams.getAll("as") } : {}),
      ...(searchParams.get("ft")
        ? { fuelTypes: searchParams.getAll("ft") }
        : {}),
      ...(searchParams.get("tsst")
        ? { transmissionTypes: searchParams.getAll("tsst") }
        : {}),
      ...(searchParams.get("dt")
        ? { driveTypes: searchParams.getAll("dt") }
        : {}),
      ...(searchParams.get("sf")
        ? { saleDateFrom: searchParams.getAll("sf") }
        : {}),
      ...(searchParams.get("st")
        ? { saleDateTo: searchParams.getAll("st") }
        : {}),
      ...(searchParams.get("bo")
        ? { isBestOffer: searchParams.getAll("bo") }
        : {}),
      ...(searchParams.get("bn")
        ? { inBuyNow: searchParams.getAll("bn") }
        : {}),
      ...(searchParams.get("bnp")
        ? { hasBuyNowPrice: searchParams.getAll("bnp") }
        : {}),
    });
    console.log(body);
    fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/auction-inventories/v1/search",
      {
        signal: controller.signal,
        body: JSON.stringify({ pageNumber: 1, pageSize: 12 }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
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

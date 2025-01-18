import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import {
  getResponse,
  isError,
  isLoading,
} from "@/store/features/vehicles.slice";
import dayjs from "dayjs";
import {
  useCountFiltersResultMutation,
  useLazyGetInventoryQuery,
} from "@/store/api";

export default function useVehiclesInventory() {
  const response = useAppSelector(getResponse);
  const loading = useAppSelector(isLoading);
  const error = useAppSelector(isError);
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

  const [getInventory] = useLazyGetInventoryQuery();
  const getNextPage = () => {
    sp.set("PageNumber", `${response.pageNumber + 1}`);
    sp.set("PageSize", `${response.pageSize}`);
    getInventory(sp);
  };

  const [countFiltersResult] = useCountFiltersResultMutation();
  const getCounters = () => {
    const body = {
      pageNumber: 1,
      pageSize: 12,
      ...(searchParams.get("SortBy")
        ? { sortBy: searchParams.get("SortBy") }
        : {}),
      isDescending: searchParams.get("IsDescending") !== "false",
      ...(searchParams.get("SearchInput")
        ? { searchInput: searchParams.get("SearchInput") }
        : {}),
      ...(searchParams.get("Makes")
        ? { makes: searchParams.getAll("Makes") }
        : {}),
      ...(searchParams.get("Models")
        ? { models: searchParams.getAll("Models") }
        : {}),
      ...(searchParams.get("VehicleTypes")
        ? { vehicleTypes: searchParams.getAll("VehicleTypes") }
        : {}),
      ...(searchParams.get("TitleTypes")
        ? { titleTypes: searchParams.getAll("TitleTypes") }
        : {}),
      ...(searchParams.get("PrimaryDamages")
        ? { primaryDamages: searchParams.getAll("PrimaryDamages") }
        : {}),
      ...(searchParams.get("SecondaryDamages")
        ? { secondaryDamages: searchParams.getAll("SecondaryDamages") }
        : {}),
      ...(searchParams.get("Locations")
        ? { locations: searchParams.getAll("Locations") }
        : {}),
      ...(searchParams.get("Colors")
        ? { colors: searchParams.getAll("Colors") }
        : {}),
      ...(searchParams.get("Condition")
        ? { condition: searchParams.getAll("Condition") }
        : {}),
      ...(searchParams.get("Type")
        ? { type: searchParams.getAll("Type") }
        : {}),
      ...(searchParams.get("YearFrom")
        ? { yearFrom: searchParams.get("YearFrom") }
        : {}),
      ...(searchParams.get("YearTo")
        ? { yearTo: searchParams.get("YearTo") }
        : {}),
      ...(searchParams.get("OdometerFrom")
        ? { odometerFrom: searchParams.get("OdometerFrom") }
        : {}),
      ...(searchParams.get("OdometerTo")
        ? { odometerTo: searchParams.get("OdometerTo") }
        : {}),
      ...(searchParams.get("Auction")
        ? { auction: searchParams.getAll("Auction") }
        : {}),
      ...(searchParams.get("State")
        ? { state: searchParams.getAll("State") }
        : {}),
      ...(searchParams.get("FuelTypes")
        ? { fuelTypes: searchParams.getAll("FuelTypes") }
        : {}),
      ...(searchParams.get("TransmissionTypes")
        ? { transmissionTypes: searchParams.getAll("TransmissionTypes") }
        : {}),
      ...(searchParams.get("DriveTypes")
        ? { driveTypes: searchParams.getAll("DriveTypes") }
        : {}),
      ...(searchParams.get("SaleDateFrom")
        ? { saleDateFrom: searchParams.get("SaleDateFrom") }
        : {}),
      ...(searchParams.get("SaleDateTo")
        ? { saleDateTo: searchParams.get("SaleDateTo") }
        : {}),
      isBestOffer: searchParams.get("IsBestOffer") === "true",
      inBuyNow: searchParams.get("InBuyNow") === "true",
      hasBuyNowPrice: searchParams.get("HasBuyNowPrice") === "true",
    };
    countFiltersResult(body);
  };

  useEffect(
    () => {
      getNextPage();
      getCounters();
    },
    // eslint-disable-next-line
    [searchParams],
  );

  return { response, loading, error, getNextPage };
}

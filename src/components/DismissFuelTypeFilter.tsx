import DismissFilter from "@/components/DismissFilter";
import { useAppSelector } from "@/store/hooks";
import { getFuelTypes } from "@/store/features/filters.slice";

export default function DismissFuelTypeFilter() {
  const fuelTypes = useAppSelector(getFuelTypes);
  const findFilter = (val: string) =>
    fuelTypes.find((item) => item.category === val) as
      | { category: string }
      | undefined;
  return (
    <DismissFilter
      filterName="FuelTypes"
      searchFunction={findFilter}
      keyValue="category"
      keyLabel="spanishTranslation"
    />
  );
}

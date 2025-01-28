import DismissFilter from "@/components/DismissFilter";
import { useAppSelector } from "@/store/hooks";
import { getCylinders } from "@/store/features/filters.slice";

export default function DismissCylindersCountFilter() {
  const data = useAppSelector(getCylinders);
  const findVal = (val: string) => data.find((item) => item.key === val);
  return (
    <DismissFilter
      filterName="Cylinders"
      searchFunction={findVal}
      keyValue="key"
      keyLabel="label"
    />
  );
}

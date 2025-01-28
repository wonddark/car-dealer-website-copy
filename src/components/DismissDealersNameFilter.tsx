import DismissFilter from "@/components/DismissFilter";
import { useAppSelector } from "@/store/hooks";
import { getDealers } from "@/store/features/filters.slice";

export default function DismissDealersNameFilter() {
  const dealers = useAppSelector(getDealers);
  const findVal = (val: string) => dealers.find((item) => item.key === val);
  return (
    <DismissFilter
      filterName="Auction"
      searchFunction={findVal}
      keyValue="key"
      keyLabel="label"
    />
  );
}

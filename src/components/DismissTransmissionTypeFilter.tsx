import DismissFilter from "@/components/DismissFilter";
import { useAppSelector } from "@/store/hooks";
import { getTransmissions } from "@/store/features/filters.slice";

export default function DismissTransmissionTypeFilter() {
  const data = useAppSelector(getTransmissions);
  const findVal = (val: string) => data.find((item) => item.key === val);
  return (
    <DismissFilter
      filterName="TransmissionTypes"
      searchFunction={findVal}
      keyValue="key"
      keyLabel="label"
    />
  );
}

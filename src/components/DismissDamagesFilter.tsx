import DismissFilter from "@/components/DismissFilter";
import { getDamages } from "@/store/features/filters.slice";
import { useAppSelector } from "@/store/hooks";

export default function DismissDamagesFilter() {
  const damages = useAppSelector(getDamages);
  const findValue = (val: string) => damages.find((item) => item.key === val);
  return (
    <>
      <DismissFilter
        filterName="PrimaryDamages"
        searchFunction={findValue}
        keyValue="key"
        keyLabel="label"
      />
      <DismissFilter
        filterName="SecondaryDamages"
        searchFunction={findValue}
        keyValue="key"
        keyLabel="label"
      />
    </>
  );
}

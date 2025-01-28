import DismissFilter from "@/components/DismissFilter";

export default function DismissYearOfReleaseFilter() {
  const getLater = (val: string) => ({
    value: val,
    label: `A partir del ${val}`,
  });
  const getEarlier = (val: string) => ({
    value: val,
    label: `Hasta el ${val}`,
  });
  return (
    <>
      <DismissFilter
        filterName="YearFrom"
        searchFunction={getLater}
        keyValue="value"
        keyLabel="label"
      />
      <DismissFilter
        filterName="YearTo"
        searchFunction={getEarlier}
        keyValue="value"
        keyLabel="label"
      />
    </>
  );
}

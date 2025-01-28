import DismissFilter from "@/components/DismissFilter";

export default function DismissOdometerFilter() {
  const getFrom = (val: string) => ({ value: val, label: `Más de ${val}mi` });
  const getTo = (val: string) => ({ value: val, label: `Menos de ${val}mi` });
  return (
    <>
      <DismissFilter
        filterName="OdometerFrom"
        searchFunction={getFrom}
        keyValue="value"
        keyLabel="label"
      />
      <DismissFilter
        filterName="OdometerTo"
        searchFunction={getTo}
        keyValue="value"
        keyLabel="label"
      />
    </>
  );
}

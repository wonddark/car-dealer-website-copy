import DismissFilter from "@/components/DismissFilter";

export default function DismissAuctionDateFilter() {
  const findFrom = (val: string) => ({ key: val, label: `Desde ${val}` });
  const findTo = (val: string) => ({ key: val, label: `Hasta ${val}` });
  return (
    <>
      <DismissFilter
        filterName="SaleDateFrom"
        searchFunction={findFrom}
        keyValue="key"
        keyLabel="label"
      />
      <DismissFilter
        filterName="SaleDateFrom"
        searchFunction={findTo}
        keyValue="key"
        keyLabel="label"
      />
    </>
  );
}

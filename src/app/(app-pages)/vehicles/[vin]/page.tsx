import VehicleDetails from "@/components/VehicleDetail/VehicleDetails";

type Props = {
  params: { vin: string };
};
export default async function VehicleDetailsPage(props: Readonly<Props>) {
  const {
    params: { vin },
  } = props;
  const res = await fetch(
    process.env.NEXT_PUBLIC_DOMAIN + `/api/inventory/${vin}`,
  );
  const data = await res.json();
  return <VehicleDetails vehicle={data} />;
}

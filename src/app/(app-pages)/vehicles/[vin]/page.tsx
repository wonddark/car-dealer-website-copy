import NotFound from "@/app/not-found";
import VehicleDetails from "@/components/VehicleDetail/VehicleDetails";

type Props = {
  params: { vin: string };
};

export default async function VehicleDetailsPage(props: Readonly<Props>) {
  try {
    const {
      params: { vin },
    } = props;
    const data = await fetch(
      process.env.API_ENDPOINT + `/auction-inventories?vin=${vin}`,
    ).then((res) => res.json());
    const odometerBrands = await fetch(
      process.env.API_ENDPOINT + "/lookups/OdometerBrands",
    ).then((res) => res.json());

    return <VehicleDetails vehicle={data} odometerBrands={odometerBrands} />;
  } catch (e) {
    console.error(e);
    return <NotFound />;
  }
}

export async function generateMetadata(props: Readonly<Props>) {
  try {
    const {
      params: { vin },
    } = props;
    const vehicle = await fetch(
      process.env.API_ENDPOINT + `/auction-inventories?vin=${vin}`,
    ).then((res) => res.json());

    return {
      title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      description: `${vehicle.year} ${vehicle.make} ${vehicle.model} subasta carros SUVs camionetas compra inmediata florida`,
    };
  } catch (e) {
    console.error(e);
    return {};
  }
}

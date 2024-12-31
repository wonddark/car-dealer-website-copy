import VehicleDetails from "@/components/VehicleDetail/VehicleDetails";
import { Vehicle } from "@/types/vehicle";

type Props = {
  params: { vin: string };
};
export default async function VehicleDetailsPage(props: Readonly<Props>) {
  const {
    params: { vin },
  } = props;
  const data = await fetch(
    process.env.API_ENDPOINT + `/auction-inventories?vin=${vin}`,
  ).then((res) => res.json());

  return <VehicleDetails vehicle={data} />;
}

export async function generateStaticParams(): Promise<{ vin: string }[]> {
  try {
    const buyNow = await fetch(
      process.env.API_ENDPOINT +
        `/auction-inventories/search?PageSize=50&PageNumber=1&HasBuyNowPrice=true`,
    ).then((res) => res.json());
    const mostWanted = await fetch(
      process.env.API_ENDPOINT +
        `/auction-inventories/search?PageSize=50&PageNumber=1&IsBestOffer=true`,
    ).then((res) => res.json());

    return Array.of(
      ...new Set([
        ...buyNow.data.map((item: Vehicle) => item.vin),
        ...mostWanted.data.map((item: Vehicle) => item.vin),
      ]),
    ).map((item) => ({ vin: item }));
  } catch (e) {
    return [];
  }
}

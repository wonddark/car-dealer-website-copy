import VehicleDetails from "@/components/VehicleDetails";
import top_product from "@/data/top_product";

export default function VehicleDetailsPage() {
  return <VehicleDetails vehicle={top_product[0]} />;
}

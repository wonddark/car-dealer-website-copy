import BuyNow from "@/components/home/BuyNow";
import MostWanted from "@/components/home/MostWanted";

export const metadata = {
  title: "La subasta cubana",
};

export default function Index() {
  return (
    <div className="container-xxl">
      <div className="vstack g-2 gap-2">
        <BuyNow />
        <MostWanted />
      </div>
    </div>
  );
}

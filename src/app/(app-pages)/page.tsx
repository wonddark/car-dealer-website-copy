import NewComp from "@/components/home/NewComp";

export const metadata = {
  title: "La subasta cubana",
};

export default function Index() {
  return (
    <div className="container-xxl">
      <div className="vstack g-2 gap-2">
        <NewComp />
      </div>
    </div>
  );
}

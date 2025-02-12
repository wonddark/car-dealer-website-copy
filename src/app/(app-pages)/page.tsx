import NewComp from "@/components/home/NewComp";
import { Container } from "react-bootstrap";
import HomePopulars from "@/components/home/HomePopulars";

export const metadata = {
  title: "La subasta cubana",
};

export default function Index() {
  return (
    <Container fluid="xxl">
      <NewComp />
      <hr className="border-secondary my-5" />

      <h4 className="display-6 fs-4 mb-4">Populares</h4>
      <HomePopulars />
    </Container>
  );
}

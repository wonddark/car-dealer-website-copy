import NewComp from "@/components/home/NewComp";
import Populars from "@/components/common/Populars";
import { Container } from "react-bootstrap";

export const metadata = {
  title: "La subasta cubana",
};

export default function Index() {
  return (
    <Container fluid="xxl" className="h-100 overflow-auto">
      <NewComp />
      <hr className="border-secondary my-5" />

      <h4 className="display-6 fs-4 mb-3">Populares</h4>
      <Populars />
    </Container>
  );
}

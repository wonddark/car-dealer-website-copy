import FiltersSidebar from "@/components/common/FiltersSidebar";
import Search from "@/components/home/Search";
import VehiclesInventory from "@/components/home/VehiclesInventory";
import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";

export default function VehiclesInventoryPage() {
  return (
    <div
      style={{
        position: "fixed",
        top: 101,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <Container fluid="xxl" className="h-100">
        <Row className="g-2 h-100">
          <Col lg={3} className="d-none d-lg-block h-100">
            <FiltersSidebar />
          </Col>
          <Col xs={12} lg={9} className="p-0 h-100">
            <Stack direction="vertical" gap={2} className="h-100">
              <section>
                <Search />
              </section>
              <section
                style={{
                  height: "calc(100% - 117px - 0.5rem)",
                  minHeight: "calc(100% - 117px - 0.5rem)",
                }}
              >
                <VehiclesInventory />
              </section>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

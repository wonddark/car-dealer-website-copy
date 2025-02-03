import { FAQs } from "@/data/faqs";
import * as Accordion from "@radix-ui/react-accordion";
import { Card, CardBody, CardHeader, Container } from "react-bootstrap";

export default function FAQ() {
  return (
    <section>
      <Container fluid="xxl">
        <h2 className="display-6">Preguntas frecuentes</h2>
        <Accordion.Root collapsible type="single">
          <div className="vstack gap-2">
            {FAQs.map((item) => (
              <Accordion.Item key={item.name} value={item.name}>
                <Card>
                  <CardHeader className="p-0">
                    <Accordion.Trigger className="btn btn-ligth text-start w-100">
                      {item.name}
                    </Accordion.Trigger>
                  </CardHeader>
                  <Accordion.Content>
                    <CardBody>{item.acceptedAnswer.text}</CardBody>
                  </Accordion.Content>
                </Card>
              </Accordion.Item>
            ))}
          </div>
        </Accordion.Root>
      </Container>
    </section>
  );
}

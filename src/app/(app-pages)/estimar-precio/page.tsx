"use client";

import {
  Button,
  Card,
  CardBody,
  Container,
  FormCheck,
  FormControl,
  ListGroup,
  ListGroupItem,
  Stack,
} from "react-bootstrap";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import { ChangeEventHandler, useCallback, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import {
  FeeState,
  getCategorizedFees,
  getStandardFee,
} from "@/store/features/fees.slice";
import { getFeeValue } from "@/utils/fees";
import * as Tabs from "@radix-ui/react-tabs";

export default function PriceCalculator() {
  return (
    <Container>
      <h1>Estimador de costo</h1>
      <Tabs.Root orientation="vertical" defaultValue="copart">
        <Stack direction="vertical" gap={0}>
          <Tabs.List asChild>
            <Stack direction="horizontal" gap={0}>
              <Tabs.Trigger value="copart" asChild>
                <Button
                  className="auction-tab flex-fill"
                  size="lg"
                  variant="light"
                >
                  Copart
                </Button>
              </Tabs.Trigger>
              <Tabs.Trigger value="manheim" asChild>
                <Button
                  className="auction-tab flex-fill"
                  size="lg"
                  variant="light"
                >
                  Manheim
                </Button>
              </Tabs.Trigger>
              <Tabs.Trigger value="iaa" asChild>
                <Button
                  className="auction-tab flex-fill"
                  size="lg"
                  variant="light"
                >
                  IAA
                </Button>
              </Tabs.Trigger>
            </Stack>
          </Tabs.List>
          <Tabs.Content value="copart">
            <PriceEstimator auction="copart" />
          </Tabs.Content>
          <Tabs.Content value="manheim">
            <PriceEstimator auction="manheim" />
          </Tabs.Content>
          <Tabs.Content value="iaa">
            <PriceEstimator auction="iaa" />
          </Tabs.Content>
        </Stack>
      </Tabs.Root>
    </Container>
  );
}

function PriceEstimator(props: Readonly<{ auction: string }>) {
  const {
    inputVal,
    updateMaxOffer,
    MIN_OFFER,
    MAX_OFFER,
    updateCategory,
    estimatedVal,
    result,
  } = usePriceCalculator({ ...props });
  return (
    <Card className="border-0">
      <CardBody>
        <Stack direction="vertical">
          <Stack direction="vertical" gap={3}>
            <Stack
              direction="horizontal"
              style={{ gridTemplateColumns: "1fr 1.5fr" }}
              className="d-grid align-items-center border-start border-4 border-primary ps-3 py-2 rounded-start-3"
            >
              <strong className="display-6 fs-5 me-2 fw-semibold flex-fill">
                Título
              </strong>
              <Stack direction="horizontal" gap={3} className="flex-fill">
                <FormCheck className="d-flex gap-3">
                  <FormCheckLabel className="d-flex align-items-center gap-1">
                    <FormCheckInput
                      type="radio"
                      name="titleType"
                      value="clean"
                      onChange={updateCategory}
                      defaultChecked
                    />
                    <span>Limpio</span>
                  </FormCheckLabel>
                </FormCheck>
                <FormCheck>
                  <FormCheckLabel className="d-flex align-items-center gap-1">
                    <FormCheckInput
                      type="radio"
                      name="titleType"
                      value="salvage"
                      onChange={updateCategory}
                    />
                    <span>Salvamento</span>
                  </FormCheckLabel>
                </FormCheck>
              </Stack>
            </Stack>

            <Stack
              direction="horizontal"
              style={{ gridTemplateColumns: "1fr 1.5fr" }}
              className="d-grid align-items-center border-start border-4 border-primary ps-3 py-2 rounded-start-3"
            >
              <strong className="display-6 fs-5 fw-medium me-3 flex-fill">
                Clasificación
              </strong>
              <Stack direction="horizontal" gap={3} className="flex-fill">
                <FormCheck className="d-flex gap-3">
                  <FormCheckLabel className="d-flex align-items-center gap-1">
                    <FormCheckInput
                      type="radio"
                      name="vehicleType"
                      value="light"
                      onChange={updateCategory}
                      defaultChecked
                    />
                    <span>Vehículo Ligero</span>
                  </FormCheckLabel>
                </FormCheck>
                <FormCheck>
                  <FormCheckLabel className="d-flex align-items-center gap-1">
                    <FormCheckInput
                      type="radio"
                      name="vehicleType"
                      value="heavy"
                      onChange={updateCategory}
                    />
                    <span>Vehículo Pesado</span>
                  </FormCheckLabel>
                </FormCheck>
              </Stack>
            </Stack>

            <p className="display-6 fs-5 mt-3 mb-1">Oferta máxima</p>
            <FormControl
              type="text"
              className="text-center"
              value={inputVal}
              min={MIN_OFFER}
              max={MAX_OFFER}
              onChange={updateMaxOffer}
              size="lg"
            />
          </Stack>
          <Stack direction="vertical" className="mt-4">
            <span className="display-6 text-center border-bottom border-secondary pb-1 mb-3 flex-grow-0 align-self-center px-2">
              $
              {estimatedVal.toLocaleString("es", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              *
            </span>
            <ListGroup>
              <ListGroupItem className="d-inline-flex justify-content-between">
                <span>Su oferta máxima</span>
                <strong className="text-end fw-normal">
                  $
                  {inputVal.toLocaleString("es", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </ListGroupItem>
              {result.map((item) => (
                <ListGroupItem
                  key={item.id}
                  className="d-inline-flex justify-content-between"
                >
                  <span>{`${FEE_LABELS[item.name]}${item.name !== "auction.fee" ? "" : props.auction.toUpperCase()}`}</span>
                  <strong className="text-end fw-normal">
                    $
                    {item.total.toLocaleString("es", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </ListGroupItem>
              ))}
              <ListGroupItem className="d-inline-flex justify-content-between fw-bold">
                <span>Total</span>
                <strong className="text-end">
                  $
                  {estimatedVal.toLocaleString("es", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </ListGroupItem>
            </ListGroup>
            <p>
              <small>* Este es solo un estimado y no el costo final.</small>
            </p>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
}

const usePriceCalculator = ({ auction }: { auction: string }) => {
  const MAX_OFFER = 500_000;
  const MIN_OFFER = 250;
  const [inputVal, setInputVal] = useState(MIN_OFFER);
  const updateMaxOffer: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => setInputVal(Number(value));
  const standardFees = useAppSelector(getStandardFee);
  const categorizedFees = useAppSelector(getCategorizedFees);
  const [category, setCategory] = useState<{
    titleType: string;
    vehicleType: string;
  }>({ titleType: "clean", vehicleType: "light" });
  const updateCategory: ChangeEventHandler<HTMLInputElement> = (e) =>
    setCategory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const sf = useCallback(
    () =>
      standardFees.filter(
        (item) =>
          ["all", auction].includes(item.applyTo) &&
          ["new_order", "item_fee"].includes(item.channel),
      ),
    [auction, standardFees],
  );

  const cf = useCallback(
    () =>
      categorizedFees.filter(
        (item) =>
          ["all", auction].includes(item.applyTo) &&
          ["new_order", "item_fee"].includes(item.channel) &&
          item.auctionCategory ===
            `${category.titleType}_${category.vehicleType}`,
      ),
    [category, categorizedFees, auction],
  );

  const fees = [...sf(), ...cf()];

  const result: (FeeState & { total: number })[] = [];

  fees
    .filter((item) => !item.applyToGrandTotal)
    .forEach((item) => {
      if (item.applyToOfferAmount) {
        const currentRange = item.auctionFeeValues.find(
          (token) =>
            Number(token.fromRange) <= inputVal &&
            inputVal < Number(token.toRange),
        );
        if (currentRange) {
          const basePrice =
            Number(currentRange.value) > 1
              ? Number(currentRange.value)
              : Number(currentRange.value) * inputVal;
          const plusPrice =
            Number(currentRange.percentToApply) > 1
              ? Number(currentRange.percentToApply)
              : Number(currentRange.percentToApply) * inputVal;

          result.push({ ...item, total: basePrice + plusPrice });
        } else {
          console.log("No fee applied");
        }
      } else {
        const feeVal = getFeeValue(inputVal, item.value, item.isPercent);
        const value =
          item.maxTear === 0 || item.maxTear < inputVal
            ? inputVal
            : item.maxTear;
        let restVal = value - item.baseTear;
        let amountToPlus = 0;
        if (restVal > 0) {
          if (item.nextTear > 1) {
            do {
              amountToPlus += getFeeValue(
                restVal,
                item.tearIncrement,
                item.isPercent,
              );
              restVal -= item.nextTear;
            } while (restVal > 0);
          } else {
            amountToPlus = getFeeValue(
              restVal,
              item.tearIncrement,
              item.isPercent,
            );
          }
        }
        console.table({
          fee: item.descript,
          baseTear: item.baseTear,
          value,
          minus: value - item.baseTear,
          restVal: restVal,
          toPlus: amountToPlus,
        });

        result.push({ ...item, total: feeVal + amountToPlus });
      }
    });

  const estimatedVal =
    result.reduce((total, current) => total + current.total, 0) + inputVal;

  return {
    MAX_OFFER,
    MIN_OFFER,
    inputVal,
    estimatedVal,
    result,
    updateMaxOffer,
    updateCategory,
  };
};

const FEE_LABELS: Record<string, string> = {
  "item.fee.title_mailing": "Tarifas de envío del título",
  "item.fee.enviromental": "Tarifa medioambiental",
  "system.fee.advisor": "Tarifa por Tutoría",
  "system.fee.broker": "Tarifa de la Subasta Cubana",
  "item.fee.title_traspassing": "Gestión de traspaso",
  "item.fee.internet_bid": "Tarifa de Oferta Virtual",
  "item.fee.gate": "Tarifa de Portón",
  "auction.fee": "Tarifa de ",
};

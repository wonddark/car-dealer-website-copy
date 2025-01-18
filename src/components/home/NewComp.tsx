"use client";

import * as Tabs from "@radix-ui/react-tabs";
import BuyNow from "@/components/home/BuyNow";
import MostWanted from "@/components/home/MostWanted";

export default function NewComp() {
  return (
    <Tabs.Root defaultValue="buy-now">
      <Tabs.List>
        <Tabs.Trigger value="buy-now">Comprar ahora</Tabs.Trigger>
        <Tabs.Trigger value="most-wanted">Más buscados</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="buy-now">
        <BuyNow />
      </Tabs.Content>
      <Tabs.Content value="most-wanted">
        <MostWanted />
      </Tabs.Content>
    </Tabs.Root>
  );
}

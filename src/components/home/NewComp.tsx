"use client";

import * as Tabs from "@radix-ui/react-tabs";
import BuyNow from "@/components/home/BuyNow";
import MostWanted from "@/components/home/MostWanted";

export default function NewComp() {
  return (
    <Tabs.Root defaultValue="buy-now" className="vstack gap-2 py-2">
      <Tabs.List className="d-inline-flex gap-1 py-2">
        <Tabs.Trigger value="buy-now" className="btn tabs-trigger shadow">
          Comprar ahora
        </Tabs.Trigger>
        <Tabs.Trigger value="most-wanted" className="btn tabs-trigger shadow">
          Más buscados
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="buy-now" className="">
        <BuyNow />
      </Tabs.Content>
      <Tabs.Content value="most-wanted" className="shadow-sm">
        <MostWanted />
      </Tabs.Content>
    </Tabs.Root>
  );
}

import React, { ChangeEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getBestOffersCount } from "@/store/features/filters.slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { resetData } from "@/store/features/vehicles.slice";

export default function BestOffers() {
  const { counter, checked, toggle } = useBestOffers();
  return (
    <div className="form-check form-switch">
      <label
        className="form-check-label d-inline-flex w-100 align-items-center justify-content-between"
        htmlFor="best-offer"
      >
        <span>Mejores ofertas</span>
        <small>{counter}</small>
      </label>
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="best-offer"
        name="IsBestOffer"
        checked={checked}
        onChange={toggle}
      />
    </div>
  );
}

const useBestOffers = () => {
  const counter = useAppSelector(getBestOffersCount);
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const checked = searchParams.get("IsBestOffer") === "true";
  const toggle: ChangeEventHandler<HTMLInputElement> = ({
    target: { checked },
  }) => {
    dispatch(resetData());
    const sp = new URLSearchParams(searchParams);
    if (checked) {
      sp.set("IsBestOffer", "true");
    } else {
      sp.set("IsBestOffer", "false");
    }

    push(`${pathname}?${sp}`);
  };

  return { counter, checked, toggle };
};

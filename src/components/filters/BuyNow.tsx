import React, { ChangeEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getBuyNowCount } from "@/store/features/filters.slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { resetData } from "@/store/features/vehicles.slice";

export default function BuyNow() {
  const { counter, checked, toggle } = useBuyNow();
  return (
    <div className="form-check form-switch">
      <label
        className="form-check-label d-inline-flex w-100 align-items-center justify-content-between"
        htmlFor="flexSwitchCheckDefault"
      >
        <span>Comprar ahora</span>
        <small>{counter}</small>
      </label>
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        name="InBuyNow"
        value="true"
        checked={checked}
        onChange={toggle}
      />
    </div>
  );
}

const FILTER_NAME = "InBuyNow";

const useBuyNow = () => {
  const counter = useAppSelector(getBuyNowCount);
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const checked = searchParams.get(FILTER_NAME) === "true";
  const toggle: ChangeEventHandler<HTMLInputElement> = ({
    target: { checked },
  }) => {
    dispatch(resetData());
    const sp = new URLSearchParams(searchParams);
    if (checked) {
      sp.set(FILTER_NAME, "true");
    } else {
      sp.set(FILTER_NAME, "false");
    }

    push(`${pathname}?${sp}`);
  };

  return { counter, checked, toggle };
};

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { MouseEventHandler, useCallback, useState } from "react";
import { MAX_ODOMETER_VAL, STEP_ODOMETER_VAL } from "@/types/vehicle";
import "nouislider/dist/nouislider.min.css";
import { resetData } from "@/store/features/vehicles.slice";
import { useAppDispatch } from "@/store/hooks";
import * as Slider from "@radix-ui/react-slider";
import * as Collapsible from "@radix-ui/react-collapsible";

export default function OdometerFilter() {
  const { limits, filterByOdometer, updateLimits, clearOdometerFilters } =
    useOdometerRange();
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <Collapsible.Root
      className="sidebar-filter"
      open={isOpen}
      onOpenChange={toggleIsOpen}
    >
      <Collapsible.Trigger className="f-trigger" asChild>
        <div className="f-trigger-inner">
          <strong className="flex-fill">Odómetro</strong>
          {(Number(limits.max) !== MAX_ODOMETER_VAL ||
            Number(limits.min) > 0) && (
            <button className="f-reset btn p-0" onClick={clearOdometerFilters}>
              Limpiar
            </button>
          )}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content className="f-content">
        <div className="vstack gap-2">
          <div className="hstack justify-content-between align-items-center text-muted">
            <small> {`${limits.min} Millas`}</small>
            <small>
              {`${Number(limits.max) < MAX_ODOMETER_VAL ? limits.max : MAX_ODOMETER_VAL + "+"} Millas`}
            </small>
          </div>
          <Slider.Root
            className="slider-root"
            value={[Number(limits.min), Number(limits.max)]}
            max={MAX_ODOMETER_VAL}
            step={STEP_ODOMETER_VAL}
            min={0}
            minStepsBetweenThumbs={1}
            onValueChange={updateLimits}
            onValueCommit={filterByOdometer}
          >
            <Slider.Track className="slider-track">
              <Slider.Range className="slider-range" />
            </Slider.Track>
            <Slider.Thumb className="slider-thumb" />
            <Slider.Thumb className="slider-thumb" />
          </Slider.Root>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

const useOdometerRange = () => {
  const r = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [limits, setLimits] = useState<{
    min: string | number;
    max: string | number;
  }>({
    min: searchParams.get("OdometerFrom") ?? 0,
    max: searchParams.get("OdometerTo") ?? MAX_ODOMETER_VAL,
  });
  const updateLimits = (vals: number[]) => {
    setLimits({ min: vals[0], max: vals[1] });
  };
  const clearOdometerFilters: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(resetData());
    setLimits({ min: 0, max: MAX_ODOMETER_VAL });
    r.push(
      pathname +
        "?" +
        createQueryString(
          {
            name: "OdometerFrom",
            value: null,
          },
          {
            name: "OdometerTo",
            value: null,
          },
        ),
    );
  };

  const createQueryString = useCallback(
    (...params: { name: string; value: string | null }[]) => {
      const sp = new URLSearchParams(searchParams.toString());
      for (const param of params) {
        if (param.value) {
          sp.set(param.name, param.value);
        } else {
          sp.delete(param.name);
        }
      }
      return sp.toString();
    },
    [searchParams],
  );

  const filterByOdometer = (values: number[]) => {
    dispatch(resetData());
    const from = Number(values[0]);
    const to = Number(values[1]);
    setLimits({ min: from, max: to });
    r.push(
      pathname +
        "?" +
        createQueryString(
          {
            name: "OdometerFrom",
            value: from > 0 ? `${from}` : null,
          },
          {
            name: "OdometerTo",
            value: to < MAX_ODOMETER_VAL ? `${to}` : null,
          },
        ),
    );
  };

  return { limits, filterByOdometer, updateLimits, clearOdometerFilters };
};

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { MAX_ODOMETER_VAL, STEP_ODOMETER_VAL } from "@/types/vehicle";
import "nouislider/dist/nouislider.min.css";
import { resetData, toggleLoading } from "@/redux/features/vehicles.slice";
import { useAppDispatch } from "@/redux/hooks";
import * as Slider from "@radix-ui/react-slider";

export default function OdometerFilter() {
  const { limits, filterByOdometer, updateLimits } = useOdometerRange();

  return (
    <>
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse-odometer"
          aria-controls="collapse-odometer"
        >
          <strong>Odómetro</strong>
        </button>
      </h2>
      <div
        id="collapse-odometer"
        className="accordion-collapse collapse"
        data-bs-parent="#accordion-filters"
      >
        <div className="accordion-body">
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
        </div>
      </div>
    </>
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
    dispatch(toggleLoading());
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

  return { limits, filterByOdometer, updateLimits };
};

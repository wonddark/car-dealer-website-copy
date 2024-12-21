import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { MAX_ODOMETER_VAL, STEP_ODOMETER_VAL } from "@/types/vehicle";
import Nouislider from "nouislider-react";
import "nouislider/dist/nouislider.min.css";
import { resetData } from "@/redux/features/vehicles.slice";
import { useAppDispatch } from "@/redux/hooks";

export default function OdometerFilter() {
  const { min, max, filterByOdometer } = useOdometerRange();

  return (
    <div className="vstack gap-2 pt-4 px-3 pb-1">
      <div className="hstack justify-content-between align-items-center text-muted">
        <small>{min}</small>
        <small>{Number(max) < MAX_ODOMETER_VAL ? max : "Max"}</small>
      </div>
      <Nouislider
        range={{ min: 0, max: MAX_ODOMETER_VAL }}
        start={[Number(min), Number(max)]}
        connect
        animate
        onChange={filterByOdometer}
        step={STEP_ODOMETER_VAL}
      />
    </div>
  );
}

const useOdometerRange = () => {
  const r = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const min = searchParams.get("OdometerFrom") ?? 0;
  const max = searchParams.get("OdometerTo") ?? MAX_ODOMETER_VAL;

  const createQueryString = useCallback(
    (...params: { name: string; value: string }[]) => {
      const sp = new URLSearchParams(searchParams.toString());
      for (const param of params) {
        sp.set(param.name, param.value);
      }
      return sp.toString();
    },
    [searchParams],
  );

  const filterByOdometer = (values: string[]) => {
    dispatch(resetData());
    r.push(
      pathname +
        "?" +
        createQueryString(
          {
            name: "OdometerFrom",
            value: `${Number(values[0])}`,
          },
          {
            name: "OdometerTo",
            value:
              Number(values[1]) < MAX_ODOMETER_VAL
                ? `${Number(values[1])}`
                : "null",
          },
        ),
    );
  };

  return { min, max, filterByOdometer };
};

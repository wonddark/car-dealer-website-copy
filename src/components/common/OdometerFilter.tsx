import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { MAX_ODOMETER_VAL, STEP_ODOMETER_VAL } from "@/types/vehicle";
import Nouislider from "nouislider-react";
import "nouislider/dist/nouislider.min.css";
import { resetData, toggleLoading } from "@/redux/features/vehicles.slice";
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

  const filterByOdometer = (values: string[]) => {
    dispatch(toggleLoading());
    dispatch(resetData());
    const from = Number(values[0]);
    const to = Number(values[1]);
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

  return { min, max, filterByOdometer };
};

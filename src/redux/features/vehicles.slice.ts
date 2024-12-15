import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_VEHICLE_PAGE_SIZE, VehicleResponse } from "@/types/vehicle";

const initialState: VehicleResponse = {
  totalPages: 0,
  totalCount: 0,
  pageNumber: 0,
  next: undefined,
  prev: undefined,
  pageSize: DEFAULT_VEHICLE_PAGE_SIZE,
  data: [],
};

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    appendData: (state, { payload }: PayloadAction<VehicleResponse>) => {
      return { ...payload, data: state.data.concat(payload.data) };
    },
    resetData: () => initialState,
  },
  selectors: {
    getResponse: (state) => state,
  },
});

export const {
  actions: { appendData, resetData },
  selectors: { getResponse },
} = vehiclesSlice;

export default vehiclesSlice;

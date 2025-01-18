import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_VEHICLE_PAGE_SIZE, VehicleResponse } from "@/types/vehicle";
import vehiclesApi from "@/store/api";

type VehiclesState = {
  response: VehicleResponse;
  status: {
    loading: boolean;
    error: boolean;
  };
};

export const initialState: VehiclesState = {
  response: {
    totalPages: 0,
    totalCount: 0,
    pageNumber: 0,
    next: undefined,
    prev: undefined,
    pageSize: DEFAULT_VEHICLE_PAGE_SIZE,
    data: [],
  },
  status: {
    loading: true,
    error: false,
  },
};

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    resetData: (state) => ({ ...state, response: initialState.response }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      vehiclesApi.endpoints.getInventory.matchFulfilled,
      (state, { payload }: PayloadAction<VehicleResponse>) => {
        state.response = {
          ...payload,
          data: state.response.data.concat(payload.data),
        };
        state.status = { loading: false, error: false };
      },
    );
    builder.addMatcher(
      vehiclesApi.endpoints.getInventory.matchRejected,
      (state) => {
        state.status = { loading: false, error: true };
      },
    );
    builder.addMatcher(
      vehiclesApi.endpoints.getInventory.matchPending,
      (state) => {
        state.status = { error: false, loading: true };
      },
    );
  },
  selectors: {
    getResponse: (state) => state.response,
    isLoading: (state) => state.status.loading,
    isError: (state) => state.status.error,
  },
});

export const {
  actions: { resetData },
  selectors: { getResponse, isLoading, isError },
} = vehiclesSlice;

export default vehiclesSlice;

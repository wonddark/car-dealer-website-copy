import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_VEHICLE_PAGE_SIZE, VehicleResponse } from "@/types/vehicle";

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
    appendData: (state, { payload }: PayloadAction<VehicleResponse>) => {
      const uniqueData = state.response.data.concat(
        payload.data.filter(
          (item) => !state.response.data.find((i) => i.vin === item.vin),
        ),
      );
      return {
        ...state,
        response: {
          ...payload,
          data: uniqueData,
        },
        status: { loading: false, error: false },
      };
    },
    resetData: (state) => ({ ...state, response: initialState.response }),

    toggleLoading: (state) => ({
      ...state,
      status: { loading: true, error: false },
    }),
    toggleError: (state) => ({
      ...state,
      status: { loading: false, error: true },
    }),
  },
  selectors: {
    getResponse: (state) => state.response,
    getLoadingStatus: (state) => state.status.loading,
    getErrorStatus: (state) => state.status.error,
  },
});

export const {
  actions: { appendData, resetData, toggleError, toggleLoading },
  selectors: { getResponse, getLoadingStatus, getErrorStatus },
} = vehiclesSlice;

export default vehiclesSlice;

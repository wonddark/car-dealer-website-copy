import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_VEHICLE_PAGE_SIZE, VehicleResponse } from "@/types/vehicle";

type VehiclesState = {
  response: VehicleResponse;
  onlyBestOffer: boolean;
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
  onlyBestOffer: true,
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
      return {
        ...state,
        response: {
          ...payload,
          data: state.response.data.concat(payload.data),
        },
        status: { loading: false, error: false },
      };
    },
    resetData: (state) => ({ ...state, response: initialState.response }),
    toggleBestOffer: (state) => ({
      ...state,
      onlyBestOffer: !state.onlyBestOffer,
    }),
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
    getIsBestOffer: (state) => state.onlyBestOffer,
    getLoadingStatus: (state) => state.status.loading,
    getErrorStatus: (state) => state.status.error,
  },
});

export const {
  actions: {
    appendData,
    resetData,
    toggleBestOffer,
    toggleError,
    toggleLoading,
  },
  selectors: { getResponse, getIsBestOffer, getLoadingStatus, getErrorStatus },
} = vehiclesSlice;

export default vehiclesSlice;

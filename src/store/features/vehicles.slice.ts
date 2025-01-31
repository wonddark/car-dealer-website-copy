import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DEFAULT_VEHICLE_PAGE_SIZE,
  Vehicle,
  VehicleResponse,
} from "@/types/vehicle";
import vehiclesApi from "@/store/api";

type VehiclesState = {
  response: VehicleResponse;
  status: {
    loading: boolean;
    error: boolean;
  };
  buyNow: Vehicle[];
  mostWanted: Vehicle[];
  popular: {
    name: string;
    count: number;
    models: { name: string; count: number }[];
  }[];
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
  buyNow: [],
  mostWanted: [],
  popular: [],
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
    builder.addMatcher(
      vehiclesApi.endpoints.getBuyNow.matchFulfilled,
      (state, action) => ({ ...state, buyNow: action.payload.data }),
    );
    builder.addMatcher(
      vehiclesApi.endpoints.getMostWanted.matchFulfilled,
      (state, action) => ({ ...state, mostWanted: action.payload.data }),
    );
    builder.addMatcher(
      vehiclesApi.endpoints.getPopularModels.matchFulfilled,
      (state, action) => ({
        ...state,
        popular: action.payload,
      }),
    );
  },
  selectors: {
    getResponse: (state) => state.response,
    isLoading: (state) => state.status.loading,
    isError: (state) => state.status.error,
    getBuyNow: (state) => state.buyNow,
    getMostWanted: (state) => state.mostWanted,
    getPopular: (state) => state.popular,
  },
});

export const {
  actions: { resetData },
  selectors: {
    getResponse,
    isLoading,
    isError,
    getBuyNow,
    getMostWanted,
    getPopular,
  },
} = vehiclesSlice;

export default vehiclesSlice;

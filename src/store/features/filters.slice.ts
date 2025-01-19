import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import vehiclesApi from "@/store/api";

type FiltersState = {
  counters: {
    [k: string]:
      | {
          [k: string]: number;
        }
      | { [key: string]: { count: number; models: { [k: string]: number } } }
      | number;
  };
  vehicleTypes: { key: string; type: string; weight: string }[];
  damages: { [key: string]: string };
  auctions: string[];
  fuelTypes: {
    category: string;
    spanishTranslation: string;
    keywords: string[];
  }[];
  titles: {
    key: string;
    type: string;
    meaning: string;
    cleanOrSalvage: string;
    process: string;
  }[];
  makers: { key: string }[];
  makersFiltered: { key: string }[];
  models: { key: string; maker: string }[];
  modelsFiltered: { key: string; maker: string }[];
  transmissions: { [k: string]: number };
};
const initialState: FiltersState = {
  counters: {},
  vehicleTypes: [],
  damages: {},
  auctions: [],
  fuelTypes: [],
  titles: [],
  makers: [],
  makersFiltered: [],
  models: [],
  modelsFiltered: [],
  transmissions: {},
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterMakers: (state, { payload }: PayloadAction<string>) => {
      const makersFiltered = state.makers.filter((item) =>
        item.key.toLowerCase().includes(payload.toLowerCase()),
      );

      return { ...state, makersFiltered };
    },
    filterModels: (state, { payload }: PayloadAction<string[]>) => {
      const modelsFiltered =
        payload.length > 0
          ? state.models.filter((item) =>
              payload.some((token) => token === item.maker),
            )
          : state.models;

      return { ...state, modelsFiltered };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      vehiclesApi.endpoints.countFiltersResult.matchFulfilled,
      (state, action) => {
        state.counters = action.payload;
        return state;
      },
    );
    builder.addMatcher(
      vehiclesApi.endpoints.getVehicleTypes.matchFulfilled,
      (state, action) => {
        state.vehicleTypes = action.payload;
      },
    );
    builder.addMatcher(
      vehiclesApi.endpoints.getDamageTranslations.matchFulfilled,
      (state, action) => ({ ...state, damages: action.payload }),
    );
    builder.addMatcher(
      vehiclesApi.endpoints.getAuctions.matchFulfilled,
      (state, action) => ({ ...state, auctions: action.payload }),
    );
    builder.addMatcher(
      vehiclesApi.endpoints.getFuelTypes.matchFulfilled,
      (state, action) => ({ ...state, fuelTypes: action.payload }),
    );
    builder.addMatcher(
      vehiclesApi.endpoints.getTitleTypes.matchFulfilled,
      (state, action) => ({ ...state, titles: action.payload }),
    );
    builder.addMatcher(
      vehiclesApi.endpoints.getMakersAndModels.matchFulfilled,
      (state, action) => {
        const result = action.payload;

        const makers = Object.keys(result).map((item) => ({ key: item }));
        const models = makers
          .map((item) =>
            result[item.key].map((token: string) => ({
              key: token,
              maker: item.key,
            })),
          )
          .flat();

        return {
          ...state,
          makers,
          makersFiltered: makers,
          models,
          modelsFiltered: models,
        };
      },
    );
    builder.addMatcher(
      vehiclesApi.endpoints.getTransmissionTranslations.matchFulfilled,
      (state, action) => ({ ...state, transmissions: action.payload }),
    );
  },
  selectors: {
    getAllFilters: (state) => state,
    getVehicleTypesCounters: (state) => state.counters["vehicleTypes"],
    getPrimaryDamagesCounters: (state) => state.counters["damages"],
    getSecondaryDamagesCounters: (state) => state.counters["secondaryDamages"],
    getVehicleTypes: (state) => state.vehicleTypes,
    getDamagesTranslations: (state) => state.damages,
    getBestOffersCount: (state) => state.counters["bestOffer"] as number,
    getBuyNowCount: (state) => state.counters["buyNow"] as number,
    getAuctions: (state) => state.auctions,
    getAuctionsCounters: (state) => state.counters["auctions"],
    getFuelTypes: (state) => state.fuelTypes,
    getFuelCounters: (state) => state.counters["fuelType"],
    getTitles: (state) => state.titles,
    getTitlesCounters: (state) => state.counters["titles"],
    getMakers: (state) =>
      state.makersFiltered.map((item) => ({
        ...item,
        count:
          (
            state.counters.makesAndModels as
              | { [k: string]: { count: number } }
              | undefined
          )?.[item.key]?.count ?? 0,
      })),
    getModels: (state) =>
      state.modelsFiltered.map((item) => ({
        ...item,
        count:
          (
            state.counters.makesAndModels as
              | { [k: string]: { models: { [k: string]: number } } }
              | undefined
          )?.[item.maker]?.models?.[item.key] ?? 0,
      })),
    getTransmissions: (state) =>
      Object.keys(state.transmissions).map((item) => ({
        key: item,
        count:
          (
            state.counters["transmissions"] as
              | { [k: string]: number }
              | undefined
          )?.[item] ?? 0,
        label: item,
      })),
  },
});

export const {
  actions: { filterMakers, filterModels },
  selectors: {
    getVehicleTypes,
    getDamagesTranslations,
    getPrimaryDamagesCounters,
    getSecondaryDamagesCounters,
    getVehicleTypesCounters,
    getBestOffersCount,
    getBuyNowCount,
    getAuctions,
    getAuctionsCounters,
    getFuelTypes,
    getFuelCounters,
    getTitles,
    getTitlesCounters,
    getMakers,
    getModels,
    getTransmissions,
  },
} = filtersSlice;

export default filtersSlice;

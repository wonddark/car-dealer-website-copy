import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  engines: { [k: string]: number };
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
  engines: {},
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
    getMakersFiltered: (state) => state.makersFiltered,
    getModelsFiltered: (state) => state.modelsFiltered,
    getTransmissions_v1: (state) => state.transmissions,
    getEngines_v1: (state) => state.counters["cylinders"],
    getTransmissionsCount: (state) => state.counters["transmissions"],
    getMakeAndModelsCount: (state) => state.counters.makesAndModels,
    getEngineCount: (state) => state.counters.cylinders,
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
    getMakersFiltered,
    getModelsFiltered,
    getTransmissions_v1,
    getEngines_v1,
    getMakeAndModelsCount,
    getTransmissionsCount,
    getEngineCount,
  },
} = filtersSlice;

export const getMakers = createSelector(
  [getMakersFiltered, getMakeAndModelsCount],
  (makers, count) =>
    makers.map((item) => ({
      ...item,
      count:
        (count as { [k: string]: { count: number } } | undefined)?.[item.key]
          ?.count ?? 0,
    })),
);

export const getModels = createSelector(
  [getModelsFiltered, getMakeAndModelsCount],
  (models, count) =>
    models.map((item) => ({
      ...item,
      count:
        (
          count as
            | { [k: string]: { models: { [k: string]: number } } }
            | undefined
        )?.[item.maker]?.models?.[item.key] ?? 0,
    })),
);

export const getTransmissions = createSelector(
  [getTransmissions_v1, getTransmissionsCount],
  (data, count) =>
    Object.keys(data).map((item) => ({
      key: item,
      count: (count as { [k: string]: number } | undefined)?.[item] ?? 0,
      label: item,
    })),
);

export const getEngines = createSelector(
  [getEngines_v1, getEngineCount],
  (data, count) =>
    Object.keys(data ?? {}).map((item) => ({
      key: item,
      count: (count as { [k: string]: number } | undefined)?.[item] ?? 0,
      label: item,
    })),
);

export default filtersSlice;

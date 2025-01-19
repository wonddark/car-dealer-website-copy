import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const vehiclesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_DOMAIN }),
  reducerPath: "vehicles-api",
  endpoints: (build) => ({
    getInventory: build.query({
      query: (filters: URLSearchParams) => `/api/inventory/search?${filters}`,
    }),
    countFiltersResult: build.mutation({
      query: (
        filters: Record<string, string | string[] | boolean | number | null>,
      ) => ({
        url: "/api/inventory/search/filters",
        method: "POST",
        body: JSON.stringify(filters),
      }),
    }),
    getVehicleTypes: build.query({
      query: () => "/api/filters/vehicle-type",
    }),
    getDamageTranslations: build.query({
      query: () => "/api/filters/damage-translations",
    }),
    getAuctions: build.query({
      query: () => "/api/filters/auctions",
    }),
    getFuelTypes: build.query({
      query: () => "/api/filters/fuel-types",
    }),
    getTitleTypes: build.query({
      query: () => "/api/filters/vehicle-title",
    }),
    getMakersAndModels: build.query({
      query: () => "/api/filters/brands-and-models",
    }),
    getBuyNow: build.query({
      query: () =>
        "/api/inventory/search?HasBuyNowPrice=true&IsBestOffer=false&PageNumber=1&PageSize=36",
    }),
    getMostWanted: build.query({
      query: () =>
        "/api/inventory/search?IsBestOffer=true&PageNumber=1&PageSize=36",
    }),
  }),
});

export const {
  useCountFiltersResultMutation,
  useLazyGetInventoryQuery,
  useGetVehicleTypesQuery,
  useGetDamageTranslationsQuery,
  useGetAuctionsQuery,
  useGetFuelTypesQuery,
  useGetTitleTypesQuery,
  useGetMakersAndModelsQuery,
  useGetBuyNowQuery,
  useGetMostWantedQuery,
} = vehiclesApi;

export default vehiclesApi;

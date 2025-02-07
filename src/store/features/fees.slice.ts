import { createSlice } from "@reduxjs/toolkit";
import vehiclesApi from "@/store/api";

type FeeState = {
  id: string;
  name: string;
  descript: string;
  value: number;
  isPercent: boolean;
  channel: string;
  applyTo: string;
  baseTear: number;
  nextTear: number;
  tearIncrement: number;
  incInPercent: boolean;
  status: boolean;
  indexOrder: string;
  selecteable: boolean;
  isDefault: boolean;
  applyToGrandTotal: boolean;
  applyToOfferAmount: boolean;
  auctionCategory: string;
  auctionFeeValues: { [k: string]: number }[];
  maxTear: number;
};

const initialState: FeeState[] = [];

const feesSlice = createSlice({
  name: "fees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      vehiclesApi.endpoints.getFees.matchFulfilled,
      (_, action) => action.payload,
    );
  },
  selectors: {},
});

export default feesSlice;

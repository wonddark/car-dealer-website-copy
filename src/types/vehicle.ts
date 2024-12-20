export type Vehicle = {
  lotNumber: string;
  vin: string;
  titleCode: string;
  odometer: string;
  color: string;
  primaryDamage: string;
  secondaryDamage: string;
  estimatedRepairCost: number;
  estimatedValue: number;
  engine: string;
  transmission: string;
  driveType: string;
  vehicleType: string;
  fuelType: string;
  hasKeys: boolean;
  details: string;
  offerStatus: string;
  saleStatus: string;
  currentOffer: number;
  buyNowPrice: number;
  maximumOffer: number;
  maximumBid: number;
  cubanAuctionFee: number;
  tutorialFee: number;
  virtualOfferFee: number;
  copartFee: number;
  gateFee: number;
  environmentalFee: number;
  transferFee: number;
  titleDeliveryFee: number;
  totalCost: number;
  auctionLocation: string;
  saleDate: string;
  auction: string;
  laneAndItem: string;
  lastUpdate: string;
  images: string[];
  imageUrl: string;
  year: string;
  make: string;
  model: string;
  runAndDrive: boolean;
};

export type VehicleResponse = {
  totalPages: number;
  totalCount: number;
  prev?: string;
  next?: string;
  pageNumber: number;
  pageSize: number;
  data: Vehicle[];
};

export const DEFAULT_VEHICLE_PAGE_SIZE = 12;

export type VehicleCategory = {
  title: string;
  img: string;
  url: string;
  apiFilter: string;
};

export type VehicleType = {
  key: string;
  type: string;
  weight: string;
};

export type VehicleTitle = {
  key: string;
  type: string;
  meaning: string;
  cleanOrSalvage: string;
  process: string;
};

export const STEP_ODOMETER_VAL = 1000;
export const MAX_ODOMETER_VAL = 50_000;

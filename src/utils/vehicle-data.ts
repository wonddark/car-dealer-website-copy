import { Vehicle } from "@/types/vehicle";

const formatMoney = (val: number) =>
  `$${val.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;

export const renderCurrentOffer = (val: number | undefined | null) => {
  if (val && val > 0) {
    return formatMoney(val);
  }
  if (val === 0) {
    return "Sin oferta aún";
  }

  return "No disponible";
};

export const renderSuggestedBid = (item: Vehicle) => {
  const suggestedStep = ((item.maximumOffer || item.maximumBid) ?? 2500) / 10;

  return `$${((item.currentOffer ?? 0) + suggestedStep).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
};

export const renderBuyNowPrice = (item: Vehicle) =>
  formatMoney(item.buyNowPrice);

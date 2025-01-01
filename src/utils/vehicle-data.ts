export const renderCurrentOffer = (val: number | undefined | null) => {
  if (val && val > 0) {
    return `$${val.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
  }
  if (val === 0) {
    return "Sin oferta aún";
  }

  return "No disponible";
};

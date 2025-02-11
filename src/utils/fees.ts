export const getFeeValue = (value: number, fee: number, isPercent: boolean) =>
  isPercent ? value * (fee / 100) : fee;

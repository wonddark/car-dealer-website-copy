"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function SaleDate({ date }: Readonly<{ date: string }>) {
  const [saleDate, setSaleDate] = useState("");
  useEffect(() => {
    setSaleDate(dayjs(date).format("DD/MM/YYYY HH:mm"));
  }, []);
  return (
    <div className="hstack">
      <span>Fecha de venta</span>
      <span className="text-end ms-auto">{saleDate}</span>
    </div>
  );
}

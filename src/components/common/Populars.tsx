"use client";

import Link from "next/link";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import { getPopular } from "@/store/features/vehicles.slice";

export default function Populars() {
  const popular = useAppSelector(getPopular);
  return (
    <dl
      className="d-grid column-gap-4 row-gap-3"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
      }}
    >
      {popular.map((item) => (
        <div key={item.name} className="">
          <dt className="mb-1 border-bottom border-primary-subtle">
            <Link
              href={`/vehicles?Makes=${item.name}`}
              className="d-flex gap-3 align-items-center fw-normal"
            >
              <span>{item.name}</span>
              <span>({item.count})</span>
            </Link>
          </dt>
          <div className="">
            {item.models.map((token) => (
              <dd key={token.name} className="m-0">
                <Link
                  href={`/vehicles?Makes=${item.name}&Models=${token.name}`}
                  className="d-flex gap-3 align-items-center fw-light"
                >
                  <span>{`${item.name} ${token.name}`}</span>
                  <span>({token.count})</span>
                </Link>
              </dd>
            ))}
          </div>
        </div>
      ))}
    </dl>
  );
}

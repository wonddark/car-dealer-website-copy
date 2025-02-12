"use client";

import { usePopulars } from "@/components/common/Populars";
import Link from "next/link";
import React from "react";

export default function HomePopulars() {
  const { popular, clickHandler } = usePopulars();
  return (
    <dl className="home-populars">
      {popular.map((item) => (
        <div key={item.name}>
          <dt className="m-0 p-0 border-bottom border-primary-subtle pb-1 mb-2 px-1">
            <Link
              href={`/vehicles?Makes=${item.name}`}
              onClick={clickHandler(
                `/vehicles?Makes=${item.name}&IsBestOffer=false`,
              )}
              className="d-inline-flex w-100 justify-content-between align-items-center"
            >
              <span className="text-nowrap">{item.name}</span>
              <span>({item.count})</span>
            </Link>
          </dt>
          {item.models
            .filter((m) => m.count > 0)
            .map((token) => (
              <dd
                key={token.name}
                className="p-0 m-0 ps-2 pb-1 mb-1 border-bottom border-secondary-subtle"
              >
                <Link
                  href={`/vehicles?Makes=${item.name}&Models=${token.name}`}
                  onClick={clickHandler(
                    `/vehicles?Makes=${item.name}&Models=${token.name}&IsBestOffer=false`,
                  )}
                  className="d-inline-flex align-items-center justify-content-between w-100"
                >
                  <span className="text-nowrap">{`${item.name} ${token.name}`}</span>
                  <span>({token.count})</span>
                </Link>
              </dd>
            ))}
        </div>
      ))}
    </dl>
  );
}

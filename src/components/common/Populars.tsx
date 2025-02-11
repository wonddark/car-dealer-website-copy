"use client";

import Link from "next/link";
import React, { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getPopular, resetData } from "@/store/features/vehicles.slice";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Button, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function Populars() {
  const { popular, clickHandler } = usePopulars();
  return (
    <>
      {popular
        .filter((b) => b.count > 0)
        .map((item) => (
          <NavigationMenu.Item
            key={item.name}
            className="position-relative border-t-1 navigation-menu-item"
          >
            <NavigationMenu.Trigger asChild className="w-100">
              <Button variant="link" className="rounded-0 text-decoration-none">
                <NavigationMenu.Link asChild>
                  <Link
                    href={`/vehicles?Makes=${item.name}`}
                    className="d-flex gap-3 align-items-center justify-content-between fw-normal link-secondary"
                    onClick={clickHandler(
                      `/vehicles?Makes=${item.name}&IsBestOffer=false`,
                    )}
                  >
                    <span className="text-nowrap">{item.name}</span>
                    <span>({item.count})</span>
                  </Link>
                </NavigationMenu.Link>
              </Button>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <Card className="shadow rounded-0">
                <NavigationMenu.Sub>
                  <NavigationMenu.List className="m-0 p-0 d-flex flex-column align-items-stretch">
                    {item.models
                      .filter((m) => m.count > 0)
                      .map((token) => (
                        <NavigationMenu.Item
                          key={`${item.name}-${token.name}`}
                          className="navigation-menu-item border-t-1"
                        >
                          <Button
                            variant="link"
                            className="text-decoration-none rounded-0"
                          >
                            <NavigationMenu.Link asChild>
                              <Link
                                href={`/vehicles?Makes=${item.name}&Models=${token.name}`}
                                className="d-flex gap-3 align-items-center fw-light link-secondary"
                                onClick={clickHandler(
                                  `/vehicles?Makes=${item.name}&Models=${token.name}&IsBestOffer=false`,
                                )}
                              >
                                <span className="text-nowrap">{`${item.name} ${token.name}`}</span>
                                <span>({token.count})</span>
                              </Link>
                            </NavigationMenu.Link>
                          </Button>
                        </NavigationMenu.Item>
                      ))}
                  </NavigationMenu.List>
                </NavigationMenu.Sub>
              </Card>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
    </>
  );
}

export const usePopulars = () => {
  const popular = useAppSelector(getPopular);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const clickHandler = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(resetData());
    push(href);
  };

  return { popular, clickHandler, push };
};

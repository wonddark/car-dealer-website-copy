import FilterOptionsCheckContainer from "@/components/common/FilterOptionsCheckContainer";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFilters } from "@/components/common/Filters";

export default function AuctionNames() {
  const { auctions, checked } = useAuctionNames();
  const { handleCheckChange: handleChange } = useFilters();
  return (
    <div className="widget catagory mb-4">
      <h6 className="widget-title mb-2">Subasta</h6>
      <FilterOptionsCheckContainer>
        {auctions.data.map((item) => (
          <div key={item + uuidv4()} className="form-check">
            <input
              className="form-check-input"
              id={item}
              type="checkbox"
              name="Auction"
              value={item}
              onChange={handleChange}
              checked={checked(item)}
            />
            <label className="form-check-label" htmlFor={item}>
              {item}
            </label>
          </div>
        ))}
      </FilterOptionsCheckContainer>
    </div>
  );
}

const useAuctionNames = () => {
  const searchParams = useSearchParams();
  const [auctions, setAuctions] = useState<{
    data: string[];
    loading: boolean;
    error: boolean;
  }>({ data: [], loading: true, error: false });

  const checked = (name: string) => {
    const auctions = searchParams.getAll("Auction") ?? [];

    return auctions.includes(name);
  };

  const getAuctions = () => {
    const controller = new AbortController();
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/filters/auctions`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setAuctions({ data, loading: false, error: false }))
      .catch((reason) => {
        if (reason instanceof DOMException && reason.name === "AbortError") {
          return null;
        } else {
          setAuctions({ data: [], loading: false, error: true });
        }
      });

    return () => {
      controller.abort();
    };
  };

  useEffect(getAuctions, []);

  return { auctions, checked };
};

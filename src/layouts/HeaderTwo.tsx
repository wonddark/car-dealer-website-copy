"use client";

import Link from "next/link";
import React, { useState } from "react";
import OffCanvas from "@/components/common/OffCanvas";
import { useSearchParams } from "next/navigation";

const HeaderTwo = ({ links, title }: { links: string; title: string }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const sp = useSearchParams();

  return (
    <>
      <div className="header-area" id="headerArea">
        <div className="container-xxl h-100 d-flex align-items-center justify-content-between rtl-flex-d-row-r">
          <div className="back-button me-2">
            <Link href={`/${links}?${sp.toString()}`}>
              <i className="ti ti-arrow-left"></i>
            </Link>
          </div>

          <div className="page-heading">
            <h6 className="mb-0">{title}</h6>
          </div>

          <div
            className="suha-navbar-toggler ms-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#suhaOffcanvas"
            aria-controls="suhaOffcanvas"
          >
            <button onClick={() => handleShow()}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      <OffCanvas handleShow={handleShow} show={show} />
    </>
  );
};

export default HeaderTwo;

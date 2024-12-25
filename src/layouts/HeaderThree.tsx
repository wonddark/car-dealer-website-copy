"use client";
import Link from "next/link";
import React from "react";

const HeaderThree = ({ links, title }: { links: string; title: string }) => {
  return (
    <div className="header-area" id="headerArea">
      <div className="container-xl h-100 d-flex align-items-center justify-content-between rtl-flex-d-row-r">
        <div className="back-button me-2">
          <Link href={`/${links}`}>
            <i className="ti ti-arrow-left"></i>
          </Link>
        </div>

        <div className="page-heading">
          <h6 className="mb-0">{title}</h6>
        </div>
      </div>
    </div>
  );
};

export default HeaderThree;

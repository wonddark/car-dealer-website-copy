import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="footer-nav-area d-lg-none" id="footerNav">
      <div className="suha-footer-nav">
        <ul className="h-100 d-flex align-items-center justify-content-between ps-0 d-flex rtl-flex-d-row-r">
          <li>
            <Link href="/support/price-calculator">
              <i className="ti ti-calculator"></i>Calculadora
            </Link>
          </li>
          <li>
            <Link href="/vehicles/wishlist">
              <i className="ti ti-category-plus"></i>Comparar
            </Link>
          </li>
          <li>
            <Link href="/">
              <i className="ti ti-home"></i>Home
            </Link>
          </li>
          <li>
            <Link href="/vehicles">
              <i className="ti ti-car-garage"></i>Inventario
            </Link>
          </li>
          <li>
            <Link href="/support/faq">
              <i className="ti ti-help"></i>FAQ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;

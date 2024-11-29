"use client";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import useTheme from "@/hooks/useTheme";

const OffCanvas = ({
  handleShow,
  show,
}: Readonly<{
  handleShow: MouseEventHandler<HTMLButtonElement>;
  show: boolean;
}>) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className={`offcanvas offcanvas-start suha-offcanvas-wrap ${
        show ? "show" : ""
      }`}
      tabIndex={-1}
      id="suhaOffcanvas"
      aria-labelledby="suhaOffcanvasLabel"
    >
      <button
        onClick={handleShow}
        className="btn-close btn-close-white"
        type="button"
      ></button>

      <div className="offcanvas-body">
        <div className="sidenav-profile">
          <div className="user-profile">
            <img src="/assets/img/bg-img/9.jpg" alt="" />
          </div>
          <div className="user-info">
            <h5 className="user-name mb-1 text-white">Suha Sarah</h5>
            <p className="available-balance text-white">
              Current Balance $<span className="counter">99</span>
            </p>
          </div>
        </div>

        <ul className="sidenav-nav ps-0">
          <li>
            <Link href="/profile">
              <i className="ti ti-user"></i>My Profile
            </Link>
          </li>
          <li>
            <Link href="/notifications">
              <i className="ti ti-bell-ringing lni-tada-effect"></i>
              Notifications<span className="ms-1 badge badge-warning">3</span>
            </Link>
          </li>
          <li className="suha-dropdown-menu">
            <a href="/">
              <i className="ti ti-building-store"></i>Shop Pages
            </a>
            <ul>
              <li>
                <Link href="/shop-grid">Shop Grid</Link>
              </li>
              <li>
                <Link href="/shop-list">Shop List</Link>
              </li>
              <li>
                <Link href="/single-product">Product Details</Link>
              </li>
              <li>
                <Link href="/featured-products">Featured Products</Link>
              </li>
              <li>
                <Link href="/flash-sale">Flash Sale</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/pages">
              <i className="ti ti-notebook"></i>All Pages
            </Link>
          </li>
          <li className="suha-dropdown-menu">
            <Link href="/wishlist-grid">
              <i className="ti ti-heart"></i>My Wishlist
            </Link>
            <ul>
              <li>
                <Link href="/wishlist-grid">Wishlist Grid</Link>
              </li>
              <li>
                <Link href="/wishlist-list">Wishlist List</Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="form-check form-switch mb-0 ps-5">
              <label
                className="form-check-label text-white h6 mb-0"
                htmlFor="darkSwitch"
              >
                {`${theme.slice(0, 1).toUpperCase()}${theme.slice(1)} mode`}
              </label>

              <input
                className="form-check-input"
                id="darkSwitch"
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
            </div>
          </li>
          <li>
            <Link href="/settings">
              <i className="ti ti-adjustments-horizontal"></i>Settings
            </Link>
          </li>
          <li>
            <Link href="/intro">
              <i className="ti ti-logout"></i>Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OffCanvas;

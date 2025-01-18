import React, { MouseEventHandler } from "react";
import Filters from "@/components/common/Filters";
import FloatingResultsCounter from "@/components/FloatingResultsCounter";

type Props = {
  handleShow: MouseEventHandler<HTMLButtonElement>;
  show: boolean;
};
const OffCanvasTwo = ({ handleShow, show }: Readonly<Props>) => {
  return (
    <>
      {show && (
        <div
          className={`d-lg-none offcanvas offcanvas-start suha-filter-offcanvas-wrap ${
            show ? "show" : ""
          }`}
          tabIndex={-1}
          id="suhaFilterOffcanvas"
          aria-labelledby="suhaFilterOffcanvasLabel"
        >
          <button
            onClick={handleShow}
            className="btn-close text-reset"
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar"
          ></button>
          <Filters />
          <FloatingResultsCounter />
        </div>
      )}
    </>
  );
};

export default OffCanvasTwo;

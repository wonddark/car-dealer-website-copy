import React from "react";

export default function VehiclesLoading({
  loading,
}: Readonly<{ loading: boolean }>) {
  return (
    <>
      {loading && (
        <>
          {[0, 1, 3, 4, 5, 6].map((item) => (
            <div key={item} className="col-12 col-md-6 col-xl-4">
              <div className="card" aria-hidden="true">
                <div className="card-body">
                  <div className="placeholder-glow mb-2">
                    <div className="ratio ratio-4x3 placeholder rounded-2"></div>
                  </div>
                  <h6 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h6>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
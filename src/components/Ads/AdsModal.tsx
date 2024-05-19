import React from "react";
import { Adsense } from "@ctrl/react-adsense";

export function AdsModal() {
  return (
    <div className="modal-container">
      <Adsense
        client="ca-pub-1979490362657562"
        slot="2517018283"
        style={{ display: "block", width: "100%", overflow: "hidden"}}
        responsive="true"
        layoutKey="-f9+5v+4m-d8+7b"
        format="auto"
      />
    </div>
  );
}
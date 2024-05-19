import React from "react";
import { Adsense } from "@ctrl/react-adsense";

export function AdsDetail() {
  return (
    <div style={{ display: "block", width: "100%"}} >
      <Adsense
        client="ca-pub-1979490362657562"
        slot="1420022052"
        style={{ display: "inline-block", width: "320px", height:"90px",}}
      />
    </div>
  );
}
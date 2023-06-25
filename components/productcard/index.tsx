import React from "react";
import Desktop from "./desktop";
import Mobile from "./mobile";

export default function ProductCard({ isMobile, ...props }: any) {
  if (isMobile) {
    return <Mobile {...props} />;
  }
  return <Desktop {...props} />;
}

import React from "react";
import Desktop from "./desktop";
import Mobile from "./mobile";

export default React.memo(function CollectionCard({ isMobile, ...props }: any) {
  if (isMobile) {
    return <Mobile {...props} />;
  }
  return <Desktop {...props} />;
})

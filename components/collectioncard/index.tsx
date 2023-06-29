import React from "react";
import Detail from "./detail";
import Default from "./default";

const CollectionCard = ({ isMobile, type, ...props }: any) => {
  const Template = [
    {
      id: "default",
      component: Default,
    },
    {
      id: "detail",
      component: Detail,
    },
  ];
  return (
    <>
    {Template.filter((item:any) => item.id === type).map((style:any, idx:any) => (
    <style.component key={String(idx)} {...props}
    />
  ))}
    </>
  )
}

CollectionCard.defaultProps = {
  type: "default"
};

export default React.memo(CollectionCard)
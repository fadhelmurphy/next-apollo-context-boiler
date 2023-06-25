import React from "react";
import Detail from "./detail";
import Default from "./default";

export default function CollectionCard({ isMobile, type, ...props }: any) {
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

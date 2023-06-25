import React from "react";
import ProductCard from "../../components/productcard";
import styled from "@emotion/styled";

export default function Desktop({ title = "", data = [], ...props } : {title?: string, data?: any[], props?: any}) {
  const ProductListSection = styled.div`
  background: #fff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 20px 20px 20px;
  display: grid;
  grid-template-columns: repeat(1,1fr);
  grid-gap: 15px;
  & .child-list-products-mobile {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
  }
  `
  return (
    <>
        <ProductListSection>
          <div className="head">
            <h1 className="title">{title}</h1>
          </div>
          <div className="content">
            <div className="child-list-products-mobile">
            {
                data && data.map((item: any, idx: number)=> item && (
                    <ProductCard key={idx} isMobile={false} {...props} {...item} />
                ))
            }
            </div>
          </div>
        </ProductListSection>
    </>
  );
}

import React from "react";
import styled from '@emotion/styled'
import Image from "next/image";

export default function Mobile({onAdd = () => {}, ...props }: any) {
    const { href = `/anime/${props.id}`, coverImage: {
        large = ""
    }, title: {
        english = "",
        romaji ="",
    }
} = props;

const ActionCard = styled.div`

height: auto;
width: 100%;
box-sizing: border-box;
z-index: 1;
& p{
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 35px;
  background: #1B8884;
  text-decoration: none;
  color: #fff;
  margin: 10px 0 0 0;
  box-sizing: border-box;
  cursor: pointer;
}
`
const ProductCardMobile = styled.div`
border: 1px solid #ddd;
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: space-between;
& .img-product {
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: 200px;
    background: #f2f2f2;
    position: relative;
    overflow: hidden;
}
& .img-product a {
    display: block;
    height: 100%;
    width: 100%;
}
& .img-product a img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}
& .content {
    padding: 10px;
}
& .title .english {
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
    margin: 10px 0 0 0;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    color: #000;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
& .title .romaji {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #000;
    margin: 10px 0 0 0;
    text-transform: capitalize;
    /* word-break: break-word; */
    overflow: hidden;
    /* text-overflow: ellipsis; */
    display: -webkit-box;
    /* -webkit-line-clamp: 1; */
    -webkit-box-orient: vertical;
}
`
  return (
    <>
      <ProductCardMobile>
        <div className="img-product">
          <a href={href}>
                <Image height={200} width={200} alt={romaji} src={large} />
          </a>
        </div>
        <div className="title">
          <a href={href} className="english">{english}</a>
          <span className="romaji">{romaji}</span>
        </div>
        <ActionCard onClick={()=>onAdd(props)} className="action-card"><p>ADD</p></ActionCard>
      </ProductCardMobile>
    </>
  );
}

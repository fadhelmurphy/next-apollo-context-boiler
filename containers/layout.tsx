import React, { memo } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import Head from "next/head";
import Link from "next/link";

const MenuWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  & .list-menu {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .list-menu div:not(:first-child) {
    margin: 0 0 0 20px;
  }
  & .list-menu div a {
    font-family: system-ui;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    line-height: 24px;
    text-transform: uppercase;
    text-decoration: none;
    color: #000;
  }
  & .list-menu div a:not(:first-child) {
    margin-left: 20px;
  }
`;
const Menu = (props: any) => {
  return (
    <MenuWrapper>
      <div
        className={
          `list-menu ` +
          css`
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          `
        }
      >
        {props.menuList.map((item: any, index: number) => (
          <div key={String(index + 1)}>
            <Link key={String(index + 1)} href={item.url}>
              {item.text}
            </Link>
          </div>
        ))}
      </div>
    </MenuWrapper>
  );
};
const MemoMenu = memo(Menu);

export default memo(function Layout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const menuList = React.useMemo(
    () => [
      {
        url: "/",
        text: "Home",
      },
      {
        url: "/collection",
        text: "My Collection",
      },
    ],
    []
  );
  const MHead = memo(function HeadFn() {
    return (<Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Head>)
  } )
  return (
    <>
      <MHead />
      <MemoMenu menuList={menuList} />
      {children}
    </>
  );
})

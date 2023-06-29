/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import { IconArrowLeft } from "@tabler/icons";
import React from 'react';

const Type2 = ({
	show, title, children, zIndex, contentBackground, onHide,
}: any) => (
	<div className={`drawer-mobile-type-2 ${show ? "show" : ""}`}>
		<div className="head">
			<div className="action">
				{
					typeof onHide === "function" && (
						<IconArrowLeft stroke="1" onClick={onHide} />
					)
				}
			</div>
			<div className="navigation">
				<span className="title">{title}</span>
			</div>
		</div>
		<div className="content">
			{children}
		</div>
		<style>
			{`
				${show && `
					html, body {
						overflow: hidden;
						z-index: 1;
					}
				`}
			`}
		</style>
		<style jsx>
			{`
				.drawer-mobile-type-2 {
					position: fixed;
					top: 200px;
					bottom: 0;
					background: ${contentBackground};
					width: 480px;
					z-index: ${zIndex};
					opacity: 0;
					visibility: hidden;
					transition: all .3s ease;
					height: auto;
				}
				.drawer-mobile-type-2.show {
					top: 0;
					opacity: 1;
					visibility: visible;
				}
				.drawer-mobile-type-2 .head {
					display: flex;
					justify-content: start;
					align-items: center;
					height: 6vh;
					padding: 0 15px 0 15px;
					background: #fff;
					border-bottom: 1px solid #DFE3E8;
				}
				.drawer-mobile-type-2 .head .navigation {
					display: flex;
					align-items: center;
					margin: 0 0 0 13px;
				}
				.drawer-mobile-type-2 .head .navigation span:not(:first-child) {
					margin: 0 0 0 10px;
				}
				.drawer-mobile-type-2 .head .navigation span.title {
					font-weight: 700;
					font-style: normal;
					font-size: 16px;
					line-height: 16px;
				}
				.drawer-mobile-type-2 .head .navigation span:first-child {
					cursor: pointer;
				}
				.drawer-mobile-type-2 .content {
					height: 94vh;
					overflow-y: scroll;
					box-sizing: border-box;
				}
				.drawer-mobile-type-2 .content::-webkit-scrollbar {
					display: none;
				}
				
				@media screen and (max-width: 425px) {
					.drawer-mobile-type-2 {
						bottom: 0;
						width: 100%;
					}
				}
			`}
		</style>
	</div>
);

Type2.propTypes = {
	show: PropTypes.bool,
	title: PropTypes.string.isRequired,
	children: PropTypes.any.isRequired,
	zIndex: PropTypes.number.isRequired,
	contentBackground: PropTypes.string.isRequired,
	onHide: PropTypes.func,
};

export default React.memo(Type2);

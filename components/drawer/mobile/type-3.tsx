/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import { IconArrowLeft } from "@tabler/icons";
import Button from "../../button";
import React from 'react';

const Type3 = ({
	show, title, children, zIndex, contentBackground, onHide, onSave, saveTitle,
}: any) => (
	<div className={`drawer-mobile-type-3 ${show ? "show" : ""}`}>
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
		{
			typeof onSave === "function" && (
				<div className="footer-btn grid">
					<div className="col-12">
						<Button block size="medium" variant="primary" font_family="system-ui" font_weight="500" on_click={onSave}>{saveTitle}</Button>
					</div>
				</div>
			)
		}
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
				.drawer-mobile-type-3 {
					position: fixed;
					top: 200px;
					bottom: 0;
					background: ${contentBackground};
					width: 480px;
					z-index: ${zIndex};
					opacity: 0;
					visibility: hidden;
					display: none;
					transition: all .3s ease;
					height: auto;
					width: 100vw;
				}
				.drawer-mobile-type-3.show {
					top: 0;
					opacity: 1;
					display: block;
					visibility: visible;
				}
				.drawer-mobile-type-3 .head {
					display: flex;
					justify-content: start;
					align-items: center;
					height: 6vh;
					padding: 0 15px 0 15px;
					background: #fff;
					border-bottom: 1px solid #DFE3E8;
				}
				.drawer-mobile-type-3 .head .navigation {
					display: flex;
				}
				.drawer-mobile-type-3 .head .navigation {
					display: flex;
					align-items: center;
					margin: 0 0 0 13px;
				}
				.drawer-mobile-type-3 .head .navigation span:not(:first-child) {
					margin: 0 0 0 10px;
				}
				.drawer-mobile-type-3 .head .navigation span.title {
					font-weight: 700;
					font-style: normal;
					font-size: 16px;
					line-height: 16px;
				}
				.drawer-mobile-type-3 .head .navigation span:first-child {
					cursor: pointer;
				}
				.drawer-mobile-type-3 .content {
					height: 94vh;
					overflow-y: scroll;
					box-sizing: border-box;
                    padding-bottom: 80px;
					position: relative;
				}
				.drawer-mobile-type-3 .content::-webkit-scrollbar {
					display: none;
				}
				.drawer-mobile-type-3 .footer-btn {
					width: 375px;
					padding: 16px;
					background: #fff;
					box-shadow: 0px -3px 10px rgba(145, 158, 171, 0.1);
					position: fixed;
					bottom: 0;
					box-sizing: border-box;
					z-index: ${zIndex + 1};
					margin: 0;
				}
				
				@media screen and (max-width: 425px) {
					.drawer-mobile-type-3 {
						bottom: 0;
						width: 100%;
					}
				}
			`}
		</style>
	</div>
);

Type3.propTypes = {
	show: PropTypes.bool,
	title: PropTypes.string.isRequired,
	saveTitle: PropTypes.string.isRequired,
	children: PropTypes.any.isRequired,
	zIndex: PropTypes.number.isRequired,
	contentBackground: PropTypes.string.isRequired,
	onHide: PropTypes.func,
	onSave: PropTypes.func,
};

export default Type3;

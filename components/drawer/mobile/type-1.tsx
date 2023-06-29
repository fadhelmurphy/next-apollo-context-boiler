/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import { IconX, IconArrowLeft } from "@tabler/icons";
import Button from "../../button";
import React from 'react';

const Type1 = ({
	show, title, children, zIndex, contentBackground, saveTitle, onBack, onHide, onReset, onSave, onSelect
}: any) => (
	<div className={`drawer-mobile-type-1 ${show ? "show" : ""}`}>
		<div className="head">
			<div className="navigation">
				<p className="title">
					{
						typeof onHide === "function" && (
							<IconX stroke="1" onClick={onHide} />
						)
					}
					{
						typeof onBack === "function" && (
							<IconArrowLeft stroke="1" onClick={onBack} />
						)
					}
					<span>{title}</span>
				</p>
			</div>
			<div className="action">
				{
					typeof onReset === "function" && (
						<span className="reset" onClick={onReset}>Reset</span>
					)
				}
			</div>
		</div>
		<div className="content">
			{children}
		</div>
		{
			typeof onSave !== "function" ? (
				<div className="footer-btn">
				<Button block color="#000" size="medium" variant="secondary" font_family="system-ui" font_weight="500" on_click={onHide||onBack}>Cancel</Button>
				</div>
			)
			: (
				<div className="footer-btn">
							<Button block margin="0 0 15px" color="#000" size="medium" variant="secondary" font_family="system-ui" font_weight="500" on_click={onBack||onHide}>Cancel</Button>
							{typeof onSelect === "function" && (<Button block margin="0 0 15px" size="medium" variant="secondary" font_family="system-ui" font_weight="500" on_click={onSelect}>ADD NEW COLLECTION</Button>)}
							<Button block margin="0 0 15px" size="medium" variant="primary" font_family="system-ui" font_weight="500" on_click={onSave}>{saveTitle}</Button>
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
				.drawer-mobile-type-1 {
					position: fixed;
					top: 200px;
					bottom: 0;
					background: ${contentBackground};
					width: 100vw;
					z-index: ${zIndex};
					opacity: 0;
					visibility: hidden;
					transition: all .3s ease;
					height: auto;
				}
				.drawer-mobile-type-1.show {
					top: 0;
					opacity: 1;
					visibility: visible;
				}
				.drawer-mobile-type-1 .head {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 6vh;
					padding: 0 20px 0 15px;
					background: #fff;
					border-bottom: 1px solid #DFE3E8;
				}
				.drawer-mobile-type-1 .head .navigation p.title {
					display: flex;
					align-items: center;
					font-weight: 700;
					font-style: normal;
					font-size: 16px;
					line-height: 16px;
				}
				.drawer-mobile-type-1 .head .navigation span:not(:first-child) {
					margin: 0 0 0 10px;
				}
				.drawer-mobile-type-1 .head .navigation span:first-child {
					cursor: pointer;
				}
				.drawer-mobile-type-1 .head .action .reset {
					font-weight: 400;
					font-size: 14px;
					line-height: 16px;
				}
				.drawer-mobile-type-1 .head .action .reset:hover {
					cursor: pointer
				}
				.drawer-mobile-type-1 .content {
					height: 75vh;
					overflow-y: scroll;
					box-sizing: border-box;
					padding-bottom: ${typeof onSave === "function" ? "70px" : "0"};
				}
				.drawer-mobile-type-1 .content::-webkit-scrollbar {
					display: none;
				}
				.drawer-mobile-type-1 .footer-btn {
					width: 480px;
					padding: 15px;
					background: #fff;
					box-shadow: 0px -3px 10px rgba(145, 158, 171, 0.1);
					position: fixed;
					bottom: 0;
					box-sizing: border-box;
					z-index: ${zIndex + 1};
				}
				
				@media screen and (max-width: 425px) {
					.drawer-mobile-type-1 {
						bottom: 0;
						width: 100%;
					}
					.drawer-mobile-type-1 .footer-btn {
						width: 100%;
					}
				}
			`}
		</style>
	</div>
);

Type1.propTypes = {
	show: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.any.isRequired,
	zIndex: PropTypes.number.isRequired,
	contentBackground: PropTypes.string.isRequired,
	saveTitle: PropTypes.string.isRequired,
	onBack: PropTypes.func,
	onHide: PropTypes.func,
	onReset: PropTypes.func,
	onSave: PropTypes.func,
};

export default React.memo(Type1);

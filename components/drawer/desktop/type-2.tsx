/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from "prop-types";
import { IconX, IconArrowLeft, IconTicket } from "@tabler/icons";
import Button from "../../button";

const Type3 = ({
	show, title, children, zIndex, contentBackground, onHide, onSave, saveTitle, promoCode, onBack, width,
}: any) => (
	<>
		<div className={`drawer-type-4-filter ${show ? "show" : ""}`} onClick={onHide} />
		<div className={`drawer-type-4 ${show ? "show" : ""}`}>
			<div className="head">
				<div className="navigation">
					{
						typeof onBack === "function" && (
							<span className="back">
								<IconArrowLeft stroke="1" onClick={onBack} />
							</span>
						)
					}
					<span className="title">{title}</span>
				</div>
				<div className="action">
					{
						typeof onHide === "function" && (
							<span>
								<IconX stroke="1.5" onClick={onHide} />
							</span>
						)
					}
				</div>
			</div>
			<div className="content">
				{children}
			</div>
			{typeof onSave === "function" && (promoCode
				? (
					<div className="footer-btn grid">
						<div className="icon col-2">
							<IconTicket width="100%" stroke="1" />
						</div>
						<div className="col-5">
							<div className="code">{promoCode}</div>
						</div>
						<div className="col-5">
							<Button block size="medium" variant="primary-bs" font_family="system-ui" font_weight="500" on_click={onSave}>{saveTitle}</Button>
						</div>
					</div>
				)
				: (
					<div className="footer-btn display-flex">
						<div className="col-3">
							<Button block color="#000" size="medium" variant="secondary" font_family="system-ui" font_weight="500" on_click={onHide}>CANCEL</Button>
						</div>
						<div className="col-3">
							<Button block size="medium" variant="primary" font_family="system-ui" font_weight="500" is_disabled={!onSave} on_click={onSave}>{saveTitle}</Button>
						</div>
					</div>
				))}
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
				.drawer-type-4-filter {
					position: fixed;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					background: #000;
					z-index: ${zIndex - 1};
					opacity: 0;
					visibility: hidden;
					transition: all .4s ease;
				}
				.drawer-type-4-filter.show {
					opacity: 0.5;
					visibility: visible;
				}
				.drawer-type-4 {
					position: fixed;
					background: ${contentBackground};
					width: ${width};
					z-index: ${zIndex};
					font-family: system-ui;
					opacity: 0;
					visibility: hidden;
					transition: all .4s ease;
					height: 30vh;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
				.drawer-type-4.show {
					height: 90vh;
					opacity: 1;
					visibility: visible;
				}
				.drawer-type-4 .head {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 5vh;
					padding: 10px 20px;
					background: #fff;
					border-bottom: 1px solid #DFE3E8;
				}
				.drawer-type-4 .head .navigation,.drawer-type-4 .head .action {
					display: flex;
					align-items: center;
				}
				.drawer-type-4 .head .navigation .back{
					display: flex;
				}
				.drawer-type-4 .head .navigation span.title {
					font-weight: 600;
					font-style: normal;
					font-size: 16px;
					line-height: 16px;
                    margin: ${promoCode ? "0 0 0 21px" : "0"};
				}
				.drawer-type-4 .head .action span:hover, .drawer-type-4 .head .navigation .back:hover {
					cursor: pointer;
				}
				.drawer-type-4 .content {
					height: 80vh;
					overflow-y: scroll;
					box-sizing: border-box;
					padding-bottom: ${typeof onSave === "function" ? "50px" : "0"};
				}
				.drawer-type-4 .content::-webkit-scrollbar {
					display: none;
				}
				.drawer-type-4 .footer-btn {
					width: ${width};
					padding: 10px 15px;
					background: #fff;
					box-shadow: 0px -3px 10px rgba(145, 158, 171, 0.1);
					position: fixed;
					bottom: 0;
					box-sizing: border-box;
                    justify-content: end;
                    flex-wrap: wrap;
					z-index: ${zIndex + 1};
				}
                .drawer-type-4 .footer-btn>* { 
                    flex: 0 0 150px;
                    margin: 0 5px;
                }
                .drawer-type-4 .icon {    
                    align-self: center;
                    align-items: center;
                    justify-content: center;
                }

                .drawer-type-4 .footer-btn div .code {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 6px 10px;
                    border: 1px solid #DFE3E8;
                    box-sizing: border-box;
                    background: #F9FAFB;
				}
			`}
		</style>
	</>
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
	promoCode: PropTypes.string,
	onBack: PropTypes.func,
	width: PropTypes.string,
};

Type3.defaultProps = {
	width: "650px",
};

export default Type3;

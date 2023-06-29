/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from "prop-types";
import Button from "../../button";

interface IProps {
	show: boolean, message: string, zIndex: any, contentBackground: string, onHide: () => null, onSave: () => null,
}

const Confirmation = ({
	show, message, zIndex, contentBackground, onHide, onSave,
}: IProps) => (
	<>
		<div className={`drawer-type-confirmation-filter ${show ? "show" : ""}`} onClick={onHide} />
		<div className={`drawer-type-confirmation ${show ? "show" : ""}`}>
			<div className="content">
				<p>{message}</p>
			</div>
			{
				typeof onSave === "function" && (
					<div className="footer-btn grid">
						<div className="col-12">
							<Button block size="medium" variant="primary" font_family="system-ui" font_weight="500" on_click={onSave}>DELETE</Button>
						</div>
						<div className="col-12">
							<Button block color="#000" size="medium" variant="secondary" font_family="system-ui" font_weight="500" on_click={onHide}>CANCEL</Button>
						</div>
					</div>
				)
			}
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
				.drawer-type-confirmation-filter {
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
				.drawer-type-confirmation-filter.show {
					opacity: 0.5;
					visibility: visible;
				}
				.drawer-type-confirmation {
					position: fixed;
					background: ${contentBackground};
					width: 300px;
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
				.drawer-type-confirmation.show {
					height: auto;
					opacity: 1;
					visibility: visible;
				}
				.drawer-type-confirmation .head {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 5vh;
					padding: 0 15px 0 15px;
					background: #fff;
					border-bottom: 1px solid #DFE3E8;
				}
				.drawer-type-confirmation .head .navigation {
					display: flex;
					align-items: center;
				}
				.drawer-type-confirmation .head .navigation span.title {
					font-weight: 600;
					font-style: normal;
					font-size: 16px;
					line-height: 16px;
				}
				.drawer-type-confirmation .head .action span:hover {
					cursor: pointer;
				}
				.drawer-type-confirmation .content {
					height: 25vh;
					overflow-y: scroll;
					box-sizing: border-box;
					padding-bottom: ${typeof onSave === "function" ? "50px" : "0"};
				}
				.drawer-type-confirmation .content p{
                    padding: 16px 20px;
				}
				.drawer-type-confirmation .content::-webkit-scrollbar {
					display: none;
				}
				.drawer-type-confirmation .footer-btn {
					width: 300px;
					padding: 16px;
					background: #fff;
					box-shadow: 0px -3px 10px rgba(145, 158, 171, 0.1);
					position: fixed;
					bottom: 0;
					box-sizing: border-box;
                    row-gap: 8px;
					z-index: ${zIndex + 1};
				}
			`}
		</style>
	</>
);

Confirmation.propTypes = {
	show: PropTypes.bool,
	zIndex: PropTypes.number.isRequired,
	message: PropTypes.string.isRequired,
	contentBackground: PropTypes.string.isRequired,
	onHide: PropTypes.func,
	onSave: PropTypes.func,
};

export default React.memo(Confirmation);

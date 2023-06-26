/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import { css } from "@emotion/css";
import PropTypes from "prop-types";

const Input = ({
	value,
	label,
	placeholder,
	onChange,
	validation,
	ifNotValid
}: any) => {
	let customError = "";
	if(value.match(/[^a-zA-Z]/g, "")){
		value = value.replace(/[^a-zA-Z]/g, "");
		customError = "Name must be Alphabet & Unique";
	}
	const FormInputBs = css`
	padding: 0 0 10px 0;
	font-family: system-ui;
	p.label {
		margin: 0 0 5px 0;
		font-weight: 700;
		font-style: normal;
		font-size: 12px;
		line-height: 16px;
	}
	p.error {
		margin: 4px 0;
		font-style: normal;
		font-size: 12px;
		line-height: 16px;
		color: #FF4D4F;
	}
	input {
		width: 100%;
		box-sizing: border-box;
		height: 34px;
		border: 1px solid ${validation ? "red" : "#DFE3E8"};
		border-radius: 2px;
		outline: none;
		padding: 0 10px;
		font-weight: 400;
		font-style: normal;
		font-size: 14px;
		line-height: 22px;
		transition: all .3s ease;
		background: white;
		color: black;
	} 
	input::placeholder {
		color: #919EAB;
	} 
	input:focus,
	input:hover {
		border: 1px solid #1B8884;
	}
	`
	return (
	<div className={FormInputBs}>
		{ifNotValid(validation)}
		{
			label && (
				<p className="label">{label}</p>
			)
		}
		<input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required />
		{validation && <p className="error">{`${label} must be filled`}</p>}
		{!validation && customError.length > 0 && <p className="error">{customError}</p>}
	</div>
)};

Input.propTypes = {
	value: PropTypes.any,
	label: PropTypes.any,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	validation: PropTypes.bool,
	ifNotValid: PropTypes.func,
};

Input.defaultProps = {
	placeholder: "please type ...",
	ifNotValid: () => {}
};

export default Input;

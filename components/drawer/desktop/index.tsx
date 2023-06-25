/* eslint-disable react/no-children-prop */
/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import PropTypes from "prop-types";
import TypeOne from "./type-1";
import TypeTwo from "./type-2";
import React from "react";
import Confirmation from "./confirmation";

const Template = [
	{
		id: "type-1",
		component: TypeOne,
	},
	{
		id: "type-2",
		component: TypeTwo,
	},
	{
		id: "confirmation",
		component: Confirmation,
	},
];

const Desktop = ({
	type, ...props
}: any) => (
	<>{
		Template.filter((item) => item.id === type).map((style: any, idx: Number) => (
			<style.component
				key={String(idx)}
				{...props}
			/>
		))
	}</>
);

Desktop.propTypes = {
	type: PropTypes.string.isRequired,
	show: PropTypes.bool,
	title: PropTypes.string.isRequired,
	message: PropTypes.string,
	isEdit: PropTypes.bool,
	children: PropTypes.any,
	zIndex: PropTypes.number.isRequired,
	contentBackground: PropTypes.string,
	saveTitle: PropTypes.string.isRequired,
	onBack: PropTypes.func,
	onHide: PropTypes.func,
	onReset: PropTypes.func,
	onSave: PropTypes.func,
	promoCode: PropTypes.string,
	width: PropTypes.string,
	onSelect: PropTypes.func,
};

export default Desktop;

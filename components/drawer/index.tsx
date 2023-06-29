/* eslint-disable react/require-default-props */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from "prop-types";
import Desktop from "./desktop";
import Mobile from "./mobile";

const Drawer = ({
	isMobile,
	...otherProps
}: any) => {

	if (!isMobile) {

		return (
			<Desktop
				{...otherProps}
			/>
		);

	}
	return (
		<>
		<Mobile
			{...otherProps}
		/>
		</>
	);

};

Drawer.propTypes = {
	isMobile: PropTypes.bool,
	show: PropTypes.bool,
	type: PropTypes.string,
	title: PropTypes.string,
	message: PropTypes.string,
	children: PropTypes.any,
	zIndex: PropTypes.number,
	contentBackground: PropTypes.string,
	saveTitle: PropTypes.string,
	onBack: PropTypes.func,
	onHide: PropTypes.func,
	onReset: PropTypes.func,
	onSave: PropTypes.func,
	isEdit: PropTypes.bool,
	width: PropTypes.string,
	onSelect: PropTypes.func,
};

Drawer.defaultProps = {
	isMobile: false,
	type: "type-1",
	title: "Filter product",
	zIndex: 5,
	contentBackground: "#F0F3F7",
	saveTitle: "APPLY FILTER",
};

export default React.memo(Drawer);

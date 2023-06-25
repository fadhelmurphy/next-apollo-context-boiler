/* eslint-disable react/no-children-prop */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import PropTypes from "prop-types";
import Default from "./default";

const Template = [
	{
		id: "default",
		component: Default,
	},
];

const ChildDetailPage = ({
	type,
	...otherProps
}: any): any => (
	<>
	{Template.filter((item) => item.id === type).map((style, idx) => (
		<style.component
			key={String(idx)}
			{...otherProps}
		/>
	))}
	</>
);

ChildDetailPage.propTypes = {
	type: PropTypes.string,
};

ChildDetailPage.defaultProps = {
	type: "default",
};

export default ChildDetailPage;

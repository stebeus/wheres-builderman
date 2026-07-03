import { useContext } from 'react';

import { popoverIdContext } from './characters-popover.jsx';
import { Button } from './ui/index.js';

const createPlacement = ({ description, position: [row, column], wasFound }) => ({
	row,
	column,
	description,
	wasFound,
});

const createGrid = (rows = 1, columns = 1, placements = []) => {
	const createColumns = () => new Array(columns).fill(null);

	const grid = Array.from({ length: rows }, createColumns);

	for (const { row, column, description, wasFound } of placements) {
		grid[row][column] = { description, wasFound };
	}

	return grid;
};

const createCell = (row, positionSetter) => (placements, column) => {
	const popoverId = useContext(popoverIdContext);

	const { wasFound, description } = placements ?? {};

	const disabled = wasFound && { disabled: true };

	const ariaLabel = description != null && {
		'aria-label': `${description}, located at row ${row} and column ${column}`,
	};

	const tabIndex = description == null && { tabIndex: -1 };

	const handleClick = () => positionSetter([row, column]);

	return (
		<Button
			popoverTarget={popoverId}
			{...disabled}
			{...ariaLabel}
			{...tabIndex}
			onClick={handleClick}
			key={crypto.randomUUID()}
		>
			{ariaLabel['aria-label']}
		</Button>
	);
};

export const Photograph = ({ characters = [], positionSetter }) => {
	const placements = characters.map(createPlacement);
	const grid = createGrid(16, 27, placements);

	const createRow = (_, row) => grid[row].map(createCell(row, positionSetter));

	return <div className="grid">{grid.map(createRow)}</div>;
};

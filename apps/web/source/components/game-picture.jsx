import { useContext } from 'react';

import { popoverIdContext } from './characters-popover.jsx';
import { Button } from './ui/button.jsx';

const createGrid = (rows = 1, columns = 1, placements = []) => {
	const createColumns = () => new Array(columns).fill(null);

	const grid = Array.from({ length: rows }, createColumns);
	for (const { row, column, description } of placements) grid[row][column] = description;

	return grid;
};

const createPlacement = ({ description, position: [row, column] }) => ({
	row,
	column,
	description,
});

const createCell = (row, positionSetter) => (description, column) => {
	const popoverId = useContext(popoverIdContext);

	const ariaLabel = description != null && {
		'aria-label': `${description}, located at row ${row} and column ${column}`,
	};

	const tabIndex = description == null && { tabIndex: -1 };

	const handleClick = () => positionSetter(`${row},${column}`);

	return (
		<Button
			data-position={`${row},${column}`}
			popoverTarget={popoverId}
			{...ariaLabel}
			{...tabIndex}
			onClick={handleClick}
			key={crypto.randomUUID()}
		></Button>
	);
};

export const GamePicture = ({ characters, positionSetter }) => {
	const [rows, columns] = [16, 27];
	const grid = createGrid(rows, columns, characters.map(createPlacement));

	const createRow = (_, row) => grid[row].map(createCell(row, positionSetter));

	return <div className="grid">{grid.map(createRow)}</div>;
};

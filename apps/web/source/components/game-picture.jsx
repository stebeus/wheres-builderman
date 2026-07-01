/** biome-ignore-all lint/a11y/noStaticElementInteractions: <The cells are characters target boxes> */
/** biome-ignore-all lint/a11y/noNoninteractiveTabindex: <The cells are characters target boxes> */

const createGrid = (rows, columns, ...cellValues) => {
	const grid = Array.from({ length: rows }, () => new Array(columns).fill(null));
	for (const { row, column, description } of cellValues) grid[row][column] = description;
	return grid;
};

const createCell = (row) => (description, column) => {
	const tabIndex = description != null && { tabIndex: 0 };

	return (
		<div
			data-position={`${row},${column}`}
			onClick={() => {}}
			onKeyDown={() => {}}
			key={crypto.randomUUID()}
		>
			<p {...tabIndex}>
				<strong>{description}</strong>. Located at row {row} and column {column}.
			</p>
		</div>
	);
};

export const GamePicture = () => {
	const rows = 16;
	const columns = 26;

	const grid = createGrid(
		rows,
		columns,
		{ row: 0, column: 0, description: 'I am a noob' },
		{ row: 10, column: 20, description: 'I am a pro' },
	);

	const createRow = (_, row) => grid[row].map(createCell(row));

	const style = /* css */ `
		.grid {
			display: grid;
			grid-template-rows: repeat(${rows}, 100px);
			grid-template-columns: repeat(${columns}, 100px);

			div {
				outline: 1px solid red;
				font-size: 12px;
				overflow-x: auto;
			}
		}`;

	return (
		<div className="grid">
			<style>{style}</style>
			{grid.map(createRow)}
		</div>
	);
};

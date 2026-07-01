const createItem = (item) => (
	<li key={crypto.randomUUID()}>
		<button
			popoverTarget="list-popover"
			command="close"
			onClick={() => {
				console.log(item === 'bye');
			}}
		>
			{item}
		</button>
	</li>
);

export const ListPopover = ({ items }) => (
	<ul id="list-popover" popover="auto">
		{items.map(createItem)}
	</ul>
);

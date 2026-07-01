import { createContext, useContext } from 'react';

import { fetchData } from '#root/services/fetch.js';

import { Button } from './ui/button.jsx';

export const popoverIdContext = createContext('characters-popover');

export const CharactersPopover = ({ characters, position }) => {
	const popoverId = useContext(popoverIdContext);

	const handleClick = async (name) => {
		const isCharacter = await fetchData(`characters/name/${name}/position/${position}`);
		console.log(isCharacter); // todo: Expand handler functionality
	};

	const createCharacter = ({ id, name }) => (
		<li key={id}>
			<Button popoverTarget={popoverId} role="menuitem" onClick={() => handleClick(name)}>
				{name}
			</Button>
		</li>
	);

	return (
		<ul id={popoverId} popover="auto">
			{characters.map(createCharacter)}
		</ul>
	);
};

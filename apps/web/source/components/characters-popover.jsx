import { createContext, useContext } from 'react';

import { fetchData } from '#root/services/fetch.js';

import { Button } from './ui/button.jsx';

export const popoverIdContext = createContext('characters-popover');

export const CharactersPopover = ({ characters = [], position, charactersSetter }) => {
	const popoverId = useContext(popoverIdContext);

	const handleClick = async (name, position) => {
		const isCharacter = await fetchData(
			`characters/is-character?name=${name}&position=${position}`,
		);

		const updateCharacters = (character) =>
			character.name === name && isCharacter ? { ...character, wasFound: true } : character;

		charactersSetter(characters.map(updateCharacters));
	};

	const createCharacter = ({ id, name }) => (
		<li key={id}>
			<Button popoverTarget={popoverId} role="menuitem" onClick={() => handleClick(name, position)}>
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

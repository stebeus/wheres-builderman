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

		if (!isCharacter) return alert('Wrong character!');

		const updateCharacters = (character) =>
			character.name === name && isCharacter ? { ...character, wasFound: true } : character;

		charactersSetter(characters.map(updateCharacters));
	};

	const createCharacter = ({ id, name }) => (
		<li key={id} className="interactive border-border not-last:border-b">
			<Button popoverTarget={popoverId} role="menuitem" onClick={() => handleClick(name, position)}>
				{name}
			</Button>
		</li>
	);

	return (
		<ul id={popoverId} className="border-2 border-accent p-2 text-content" popover="auto">
			{characters.map(createCharacter)}
		</ul>
	);
};

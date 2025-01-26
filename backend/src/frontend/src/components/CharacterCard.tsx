import React from 'react';
import { Character } from '../types';
import { Link } from 'react-router-dom';


interface CharacterCardProps {
    character: Character;
}
const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="character-card">
      <img src={character.profileImage} alt={character.name} />
      <h3>{character.name}</h3>
      <p>{character.description}</p>
        <Link to={`/chat/${character.id}`}>Chat Now</Link>
    </div>
  );
};

export default CharacterCard;
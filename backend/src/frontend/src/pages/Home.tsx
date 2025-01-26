import React, { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import api from '../api';
import { Character } from '../types';

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([])
    const [loading, setLoading] = useState(true)

  useEffect(() => {
      const fetchCharacters = async () => {
        try {
          const res = await api.get('/characters');
          setCharacters(res.data);
        setFilteredCharacters(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
      };

      fetchCharacters();
  }, []);
  
  useEffect(() => {
      if (searchTerm)
      {
          setFilteredCharacters(characters.filter(char => char.name.toLowerCase().includes(searchTerm.toLowerCase())))
      } else {
        setFilteredCharacters(characters)
      }
    }, [searchTerm, characters])

  return (
      <div className="home">
        <input
              type="text"
              placeholder="Search characters"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
      
          { loading ? <p>Loading...</p> :
            <div className="character-grid">
                {filteredCharacters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>
        }
    </div>
  );
};

export default Home;
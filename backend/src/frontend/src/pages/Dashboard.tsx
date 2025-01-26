import React, { useState, useEffect } from 'react';
import api from '../api';
import { Character } from '../types';
import CharacterForm from '../components/CharacterForm';
import { useAuth } from '../authContext';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [showForm, setShowForm] = useState(false);
    const { user, loading } = useAuth()
  
    const fetchCharacters = async () => {
        try {
            const res = await api.get(`/characters`);
            if (res.status === 200)
            {
                setCharacters(res.data.filter((char: Character) => char.createdBy === user?.id));
            }
        } catch (error)
        {
            console.error(error)
        }
    }
  useEffect(() => {
    if (user)
     {
      fetchCharacters()
    }
  }, [user]);
    
  const handleCharacterCreated = () => {
      setShowForm(false);
        fetchCharacters()
  }

  return (
    <div className="dashboard">
        { loading ? <p>Loading</p> : <>
        {user && (
            <>
        <h2>Welcome, {user.username}!</h2>
            </>
            )}

      
      <h2>My Characters</h2>
          <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Create Character'}</button>
          {showForm && <CharacterForm onCharacterCreated={handleCharacterCreated} />}

      <div className="character-grid">
        {characters.map(character => (
           <div key={character.id} className="character-card">
           <img src={character.profileImage} alt={character.name} />
               <h3>{character.name}</h3>
              <p>{character.description}</p>
              <Link to={`/chat/${character.id}`}>Chat Now</Link>
            </div>
          ))}
      </div>
        </>
      }
    </div>
  );
};

export default Dashboard;
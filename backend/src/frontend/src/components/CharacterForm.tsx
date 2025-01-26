import React, { useState } from 'react';
import api from '../api';

interface CharacterFormProps {
  onCharacterCreated: () => void
}
const CharacterForm: React.FC<CharacterFormProps> = ({onCharacterCreated}) => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [description, setDescription] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      try
      {
        await api.post('/characters', {name, profileImage, description, systemPrompt})
        onCharacterCreated()
      } catch (error: any) {
        console.error(error);
          alert(error?.response?.data?.message || 'Failed to create character')
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Profile Image URL:</label>
        <input type="text" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
         <div>
        <label>System Prompt:</label>
        <textarea value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} required />
      </div>
      <button type="submit">Create Character</button>
    </form>
  );
};

export default CharacterForm;
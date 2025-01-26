export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
  }
  
  export interface Character {
      id: string;
      name: string;
      profileImage: string;
      description: string;
      systemPrompt: string;
      createdBy: string;
      createdAt: string;
  }
  
  export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
  }
  
  export interface Conversation {
    id: string;
    userId: string;
    characterId: string;
    messages: Message[];
    createdAt: string;
  }
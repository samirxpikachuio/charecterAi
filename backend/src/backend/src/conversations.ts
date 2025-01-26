import { Elysia, t } from 'elysia';
import { loadConversations, saveConversations, loadCharacters } from './data';
import { generateId } from './utils';
import axios from 'axios';
import type { Message, Conversation } from './types';

const externalApiUrl = 'https://api-architectdevs.onrender.com/api/chaty';

export const conversationRoutes = new Elysia()
.post('/conversations', async ({ body, cookie, set }) => {
  const userId = cookie.sessionId
  if (!userId) {
    set.status = 401;
    return { message: 'Not logged in' };
  }
  const { characterId, content } = body;

  const conversations = await loadConversations();
  const characters = await loadCharacters();
  const character = characters.find((char) => char.id === characterId)
  if (!character) {
    set.status = 404
    return {message: 'Character not found'}
  }

    const newConversation: Conversation = {
        id: generateId(),
        userId: userId as unknown as string, // <-- FIX: Type cast to ensure it's a string
        characterId: characterId,
        messages: [] as Message[],
        createdAt: new Date().toISOString(),
    };
  
   const systemMessage: Message = { role: 'system', content: character.systemPrompt, timestamp: new Date().toISOString() };
   const userMessage: Message = {role: "user", content, timestamp: new Date().toISOString()};
   const payload = {
    messages: [systemMessage, userMessage],
   }
    const response = await axios.post(externalApiUrl, payload);
   const assistantMessage: Message = {
     role: 'assistant',
     content: response.data.message,
     timestamp: new Date().toISOString()
   };
 newConversation.messages.push(userMessage, assistantMessage);
  conversations.push(newConversation);

  await saveConversations(conversations);

  return { message: assistantMessage, id: newConversation.id };
}, {
  body: t.Object({
    characterId: t.String(),
    content: t.String()
  })
})
.post('/conversations/:id/messages', async ({ params, body, set, cookie }) => {
  const userId = cookie.sessionId
  if (!userId) {
    set.status = 401;
    return { message: 'Not logged in' };
  }
  const conversations = await loadConversations();
  const characters = await loadCharacters();

  const conversation = conversations.find((conv) => conv.id === params.id);

  if (!conversation) {
    set.status = 404;
    return { message: 'Conversation not found' };
  }
    const character = characters.find((char) => char.id === conversation.characterId)
  if (!character)
  {
    set.status = 404
    return { message: 'Character not found'}
  }
  const userMessage: Message = {role: "user", content: body.content, timestamp: new Date().toISOString()};
  const systemMessage: Message = { role: 'system', content: character.systemPrompt, timestamp: new Date().toISOString() };
  const payload = {
      messages: [systemMessage, ...conversation.messages, userMessage],
    };
 const response = await axios.post(externalApiUrl, payload);
 const assistantMessage: Message = {
      role: 'assistant',
      content: response.data.message,
      timestamp: new Date().toISOString()
    };
    conversation.messages.push(userMessage, assistantMessage);
  await saveConversations(conversations);

  return { message: assistantMessage };
}, {
   body: t.Object({
     content: t.String(),
   })
})
.get('/conversations/:id', async ({ params, set, cookie }) => {
  const userId = cookie.sessionId
if (!userId) {
    set.status = 401;
    return { message: 'Not logged in' };
}
  const conversations = await loadConversations();
  const conversation = conversations.find((conv) => conv.id === params.id);
  if (!conversation) {
    set.status = 404
     return {message: 'Conversation not found'}
   }

  return conversation;
});
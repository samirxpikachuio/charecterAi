import { Elysia, t } from "elysia";
import { loadCharacters, saveCharacters, loadUsers } from "./data";
import { generateId } from "./utils";
import { type Character } from "./types";

export const characterRoutes = new Elysia()
.get('/characters', async ({query}) => {
        const characters = await loadCharacters();
        if (query.search)
        {
          return characters.filter((character) => character.name.toLowerCase().includes((query.search ?? '').toLowerCase()))
        }
        return characters;
    }, {
      query: t.Object({
         search: t.Optional(t.String())
      })
    })
.post('/characters', async ({ body, cookie, set }) => {
  const users = await loadUsers();
  const userId = cookie.sessionId
    if (!userId) {
        set.status = 401;
        return { message: 'Not logged in' };
    }
  const user = users.find(user => user.id === userId)
  if (!user)
  {
    set.status = 404;
    return { message: "User not found" }
  }
  const characters = await loadCharacters();
    
    const newCharacter: Character = {
        id: generateId(),
        ...body,
        createdBy: userId as string,
        createdAt: new Date().toISOString(),
    };
  characters.push(newCharacter);
  await saveCharacters(characters);
  return { message: 'Character created successfully', character: newCharacter };
}, {
  body: t.Object({
    name: t.String(),
    profileImage: t.String(),
    description: t.String(),
    systemPrompt: t.String(),
  })
})
.get('/characters/:id', async ({ params }) => {
    const characters = await loadCharacters();
    const character = characters.find((char) => char.id === params.id);
    if (!character)
    {
        return { message: 'Character not found'}
    }
    return character
});
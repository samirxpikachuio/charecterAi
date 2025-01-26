import { Elysia, t } from "elysia";
import { loadUsers, saveUsers } from "./data";
import { generateId, hashPassword, comparePasswords } from "./utils";

export const authRoutes = new Elysia()
.post('/auth/register', async ({ body, set }) => {
  const users = await loadUsers();
  const { username, email, password } = body;

  if (users.some((user) => user.email === email)) {
    set.status = 400;
    return { message: 'Email already exists' };
  }
  const hashedPassword = await hashPassword(password);

  const newUser = {
    id: generateId(),
    username,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await saveUsers(users);
  return { message: 'User registered successfully', user: { username, email } };
}, {
  body: t.Object({
     username: t.String(),
    email: t.String(),
    password: t.String(),
  })
})
.post('/auth/login', async ({ body, set, cookie }) => {
  const users = await loadUsers();
  const { email, password } = body;
  const user = users.find((user) => user.email === email);

  if (!user) {
    set.status = 401;
    return { message: 'Invalid email or password' };
  }

  const passwordMatch = await comparePasswords(password, user.password);

  if (!passwordMatch) {
    set.status = 401;
    return { message: 'Invalid email or password' };
  }
   cookie.sessionId = user.id
  return { message: 'Logged in successfully', user: { username: user.username, email: user.email } };
}, {
  body: t.Object({
      email: t.String(),
      password: t.String(),
  })
})
.get('/auth/me', async ({ cookie, set }) => {
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
    
  return {
    user: { username: user.username, email: user.email }
  };
});
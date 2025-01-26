import { readFile, writeFile, access, constants, mkdir } from 'node:fs/promises';
import { type User, type Character, type Conversation } from './types';

const dataDir = './data';
const usersFile = `${dataDir}/users.json`;
const charactersFile = `${dataDir}/characters.json`;
const conversationsFile = `${dataDir}/conversations.json`;

async function ensureDataDir() {
  try {
    await access(dataDir, constants.F_OK);
  } catch (error) {
    await mkdir(dataDir, { recursive: true });
  }
}

async function loadData<T>(filePath: string, defaultValue: T): Promise<T> {
    await ensureDataDir();
    try {
      const data = await readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        await writeFile(filePath, JSON.stringify(defaultValue, null, 2));
        return defaultValue;
      }
      throw error;
    }
}

async function saveData<T>(filePath: string, data: T): Promise<void> {
    await ensureDataDir();
    await writeFile(filePath, JSON.stringify(data, null, 2));
}


export async function loadUsers(): Promise<User[]> {
  return loadData<User[]>(usersFile, []);
}

export async function saveUsers(users: User[]): Promise<void> {
    return saveData<User[]>(usersFile, users)
}

export async function loadCharacters(): Promise<Character[]> {
  return loadData<Character[]>(charactersFile, []);
}

export async function saveCharacters(characters: Character[]): Promise<void> {
  return saveData<Character[]>(charactersFile, characters);
}

export async function loadConversations(): Promise<Conversation[]> {
    return loadData<Conversation[]>(conversationsFile, []);
}

export async function saveConversations(conversations: Conversation[]): Promise<void> {
    return saveData<Conversation[]>(conversationsFile, conversations)
}
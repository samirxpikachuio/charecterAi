import { randomUUID } from 'node:crypto';
import { hash, compare } from 'bcrypt';

export function generateId() {
    return randomUUID();
}

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return await hash(password, saltRounds);
};

export const comparePasswords = async (password: string, hash: string) => {
  return await compare(password, hash);
};
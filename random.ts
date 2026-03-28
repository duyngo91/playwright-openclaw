import { randomUUID as nodeRandomUUID } from 'crypto';

export function getRandomInt(): number {
  return Math.floor(Math.random() * 10) + 1;
}

export function getRandomUUID(): string {
  return nodeRandomUUID();
}
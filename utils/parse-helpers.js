import { Buffer } from 'node:buffer';

export function jsonParseSafe(data, fallback = {}) {
  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
}

export const parseOptions = {
  'text/plain': (text) => text,
  'text/html': (text) => text,
  'application/json': (json) => jsonParseSafe(json, {}),
  'application/x-www-form-urlencoded': (text) => Object.fromEntries(new URLSearchParams(text)),
};

export async function parseBody(req, parser) {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return parser(data);
}

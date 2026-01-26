import { UserSession } from '../types';

// In-memory session storage (consider Redis for production)
const sessions = new Map<number, UserSession>();

export function getSession(telegramId: number): UserSession | undefined {
  return sessions.get(telegramId);
}

export function setSession(session: UserSession): void {
  sessions.set(session.telegram_id, session);
}

export function clearSession(telegramId: number): void {
  sessions.delete(telegramId);
}

export function updateSessionState(
  telegramId: number,
  state: UserSession['state'],
  context?: any
): void {
  const existing = sessions.get(telegramId);
  sessions.set(telegramId, {
    telegram_id: telegramId,
    state,
    context: context || existing?.context
  });
}

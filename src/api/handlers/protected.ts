import { AuthenticatedRequest } from '../middleware/auth';
import { unauthorized, json } from '../utils/response';

export async function handleProtectedRequest(auth: AuthenticatedRequest) {
  if (!auth.userId) {
    return unauthorized();
  }

  return json({
    message: `Hello, user ${auth.userId}`,
    timestamp: new Date().toISOString()
  });
}
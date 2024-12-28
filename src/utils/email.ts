export function getDomainFromEmail(email: string): string {
  return email.split('@')[1]?.toLowerCase() || '';
}
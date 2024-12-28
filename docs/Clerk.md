# Clerk Integration Documentation

## Overview

This document outlines the implementation of authentication and role management in the Gun Club Scorer application using Clerk.

## Configuration

### Environment Variables

Required environment variables:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
```

**Important:** The following secrets should ONLY be set in your deployment environment:
```env
VITE_CLERK_SECRET_KEY=your_secret_key
VITE_CLERK_WEBHOOK_SECRET=your_webhook_secret
```

Never commit these secrets to version control!

### Organization Setup

1. Create an Organization in Clerk Dashboard for Admins
2. Copy the Organization ID and set it in `src/config/clerk.ts`:
```typescript
export const ADMIN_GROUP_ID = 'your_organization_id';
```

## Role Management

### Role Types

The application uses two role types:
- `admin`: Full access to manage clubs and users
- `member`: Basic access for scoring and personal statistics

### Role Assignment

Roles are managed through Clerk Organizations:

1. **Automatic Assignment**:
   - Users with @oneuprising.com emails are automatically added to the Admin organization
   - All other users default to member role

2. **Implementation**:
```typescript
// src/api/handlers/roles.ts
export async function handleUserCreated(req: Request) {
  const { id: userId, email_addresses } = data;
  const primaryEmail = email_addresses[0]?.email_address;
  const isAdmin = primaryEmail?.endsWith('@oneuprising.com');
  
  if (isAdmin) {
    await clerkClient.organizations.createOrganizationMembership({
      organizationId: ADMIN_GROUP_ID,
      userId,
      role: 'admin'
    });
  }
}
```

### Role Checking

1. **Hook Usage**:
```typescript
const { isAdmin, role, hasPermission } = useRole();
```

2. **Permission Guards**:
```typescript
<RoleGuard requiredPermission="manage_clubs">
  <AdminComponent />
</RoleGuard>
```

## Permissions

### Admin Permissions
- manage_clubs
- manage_users
- manage_admins
- view_all

### Member Permissions
- manage_profile
- add_scores
- view_personal_stats

## Webhooks

### Setup

1. Configure webhook endpoint in Clerk Dashboard:
   - URL: `/api/webhooks/user-created`
   - Events: `user.created`

2. **Webhook Verification**:
```typescript
// src/api/middleware/webhook.ts
export async function verifyWebhook(request: Request) {
  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);
  const evt = wh.verify(payloadString, svixHeaders);
  // ...
}
```

## UI Components

### User Button
Displays user avatar and role:
```typescript
export function UserButton() {
  const { role } = useRole();
  const roleLabel = role === 'admin' ? 'Admin' : 'Member';
  
  return (
    <div className="flex flex-col items-end">
      <ClerkUserButton />
      <span className="text-xs text-gray-500">{roleLabel}</span>
    </div>
  );
}
```

### Protected Routes
```typescript
<AuthGuard>
  <RoleGuard requiredPermission="manage_clubs">
    <ProtectedComponent />
  </RoleGuard>
</AuthGuard>
```

## Best Practices

1. **Security**
   - Always verify webhooks in production
   - Use environment variables for sensitive keys
   - Implement proper permission checks

2. **Role Management**
   - Use Organizations for role grouping
   - Implement automatic role assignment
   - Verify permissions on both client and server

3. **Error Handling**
   - Gracefully handle authentication errors
   - Provide clear feedback for unauthorized actions
   - Log security-related issues

4. **UI/UX**
   - Show loading states during authentication
   - Clear role indicators
   - Proper redirection for unauthorized access

## Common Issues

1. **Missing Environment Variables**
   - Ensure all required variables are set
   - Check for typos in variable names

2. **Webhook Verification**
   - Verify webhook secret is correct
   - Check webhook endpoint configuration

3. **Role Assignment**
   - Confirm Organization ID is correct
   - Verify email domain checking logic

## Testing

1. **Role Assignment**
   - Test with @oneuprising.com email
   - Test with non-admin email
   - Verify automatic organization membership

2. **Permissions**
   - Test each permission guard
   - Verify proper access control
   - Test unauthorized access handling
import { clerkClient } from '@clerk/clerk-sdk-node';
import { json } from '../utils/response';
import type { WebhookEvent } from '@clerk/backend';

interface UserCreatedEvent extends WebhookEvent {
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      id: string;
      verification: {
        status: string;
      };
    }>;
  };
}

export async function handleUserCreated(req: Request) {
  try {
    const event = await req.json() as UserCreatedEvent;
    
    // Validate webhook payload
    if (!event?.data?.id || !Array.isArray(event.data.email_addresses)) {
      return json(
        { success: false, error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    const userId = event.data.id;
    const verifiedEmail = event.data.email_addresses.find(
      email => email.verification.status === 'verified'
    );

    if (!verifiedEmail) {
      console.warn(`No verified email found for user ${userId}`);
      return json({ success: false, error: 'No verified email found' });
    }

    const isAdmin = verifiedEmail.email_address.endsWith('@oneuprising.com');

    try {
      // Update user metadata with role
      await clerkClient.users.updateUser(userId, {
        publicMetadata: {
          role: isAdmin ? 'admin' : 'member'
        }
      });

      console.info(`Set role for user ${userId} to ${isAdmin ? 'admin' : 'member'}`);
      return json({ 
        success: true,
        message: `User role set to ${isAdmin ? 'admin' : 'member'}`
      });
    } catch (error) {
      console.error('Failed to set user role:', error);
      return json(
        { 
          success: false,
          error: 'Failed to set user role'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import mongoose from 'mongoose';
import UserModel from '@/app/models/userModel';
import { Webhook } from 'svix';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export async function POST(req) {
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  const wh = new Webhook(WEBHOOK_SECRET);
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;
  try {
    evt = wh.verify(body, req.headers);
  } catch (err) {
    return new Response('Error verifying webhook', { status: 400 });
  }

  const eventType = evt.type;
  const eventData = evt.data;

  const { email_addresses, first_name, image_url, id } = evt.data;

    const newUser = {
      email:email_addresses,
      userName:first_name,
      imageURL:image_url,
      clerkID:id,
    };

  switch (eventType) {
    case 'user.created':
      await UserModel.create(newUser);
      break;
    case 'user.updated':
      await UserModel.updateOne({ clerkID: eventData.id }, eventData);
      break;
    case 'user.deleted':
      await UserModel.deleteOne({ clerkID: eventData.id });
      break;
  }

  return new Response('Webhook received', { status: 200 });
}
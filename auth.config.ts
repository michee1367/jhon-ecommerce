import GoogleProvider from '@auth/core/providers/google';
import { serverSupabaseClient } from '#supabase/server';

export default defineNuxtAuthHandler({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});
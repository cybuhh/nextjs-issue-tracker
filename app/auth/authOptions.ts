import prisma from '@/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
});

const mockProvider = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    username: { label: 'Username', type: 'text', placeholder: 'test' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials, req) {
    return Promise.resolve({
      id: 'test',
      name: 'test',
      email: 'test@test.com',
      image: 'https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg',
    });
  },
});

const providers = process.env.MOCK_AUTH ? [mockProvider, googleProvider] : [googleProvider];

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import postgres from "postgres";
import bcrypt from 'bcryptjs';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

const handler = NextAuth({
  debug: true,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error('Missing credentials');
          };

          const result = await sql`
            SELECT * FROM admin_users 
            WHERE username = ${credentials.username}
          `;

          if (!result || result.length === 0) {
            throw new Error('No user found');
          }

          const user = result[0];

          if (!user.password_hash) {
            throw new Error('No password hash found for user');
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!passwordMatch) {
            throw new Error('Invalid password');
          }

          return {
            id: user.id.toString(),
            username: user.username,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST }; 
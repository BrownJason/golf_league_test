/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import postgres from "postgres";
import bcrypt from 'bcryptjs';

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const authOptions = NextAuth({
  debug: true,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      
      async authorize(credentials, req) {
        try {
          // Use x-real-ip header set by Edge Middleware for secure IP extraction
          let ip = 'unknown';
          if (req && req.headers && typeof req.headers['x-real-ip'] === 'string') {
            ip = req.headers['x-real-ip'];
          } else if (req && req.headers && typeof req.headers['x-forwarded-for'] === 'string') {
            ip = req.headers['x-forwarded-for'].split(',')[0].trim();
          }
          if (ip === 'unknown' && req && req.headers && typeof req.headers["host"] === 'string') {
            ip = req.headers["host"];
          }

          const maxAttempts = 5;

          // Clean up old attempts and get current attempts
          await sql`
            DELETE FROM login_attempts 
            WHERE last_attempt < NOW() - INTERVAL '10 minute'
          `;

          const [attempts] = await sql`
            INSERT INTO login_attempts (ip_address, attempt_count, last_attempt)
            VALUES (${ip}, 1, NOW())
            ON CONFLICT (ip_address) DO UPDATE 
            SET 
              attempt_count = login_attempts.attempt_count + 1,
              last_attempt = NOW()
            RETURNING attempt_count
          `;

          if (attempts.attempt_count > maxAttempts
            && process.env.NODE_ENV !== 'development' // Avoid blocking in development
            && process.env.NODE_ENV !== 'test' // Avoid blocking in tests
            && attempts.last_attempt > new Date(Date.now() - 10 * 60 * 1000) // Last 10 minutes
          ) {
            throw new Error('Too many login attempts. Please try again later.');
          }

          if (!credentials?.username || !credentials?.password) {
            throw new Error('Missing credentials');
          };

          const result = await sql`
            SELECT * FROM admin_users 
            WHERE username = ${credentials.username}
          `;

          const user = result[0];

          if (!result || result.length === 0 || !user) {
            throw new Error('Invalid credentials');
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!passwordMatch) {
            throw new Error('Invalid credentials');
          }

          return {
            id: user.id.toString(),
            username: user.username,
          };
        } catch (error) {
          if (process.env.NODE_ENV !== 'production') {
            alert('Failed auth. Please try again.');
          }
          throw new Error('Invalid credentials');
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
    maxAge: 30 * 30, // 15 Minutes  
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

export { authOptions };
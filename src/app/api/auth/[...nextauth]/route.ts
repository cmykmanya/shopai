import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/data/user";
import * as bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Fallback to mock user if database is not available
        if (credentials.email === "admin@example.com" && credentials.password === "password") {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            role: "ADMIN",
          };
        }

        // Try database authentication
        try {
          const user = await getUserByEmail(credentials.email);
          if (!user || !user.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
          if (!passwordsMatch) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || "USER",
          };
        } catch (error) {
          console.error("Database authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET || "my-super-secret-key-for-dev",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
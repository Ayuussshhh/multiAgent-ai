import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import pool from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      console: {
        log: (message) => console.log("[NextAuth][Google]", message),
        error: (message) => console.error("[NextAuth][Google]", message),
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        const query = `
          INSERT INTO users (provider, provider_id, name, email)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (email) DO UPDATE
          SET name = EXCLUDED.name,
              updated_at = NOW()
          RETURNING *;
        `;

        const values = [
          account.provider,
          account.providerAccountId,
          user.name,
          user.email,
        ];

        await pool.query(query, values);
        return true;
      } catch (error) {
        console.error("DB error:", error);
        return false; // if false → "Access Denied"
      }
    },

    async session({ session }) {
      const res = await pool.query(
        "SELECT id, name, email FROM users WHERE email = $1",
        [session.user.email]
      );

      if (res.rows.length > 0) {
        session.user.id = res.rows[0].id;
        session.user.name = res.rows[0].name;
        session.user.email = res.rows[0].email;
      }

      return session;
    },
  },
});

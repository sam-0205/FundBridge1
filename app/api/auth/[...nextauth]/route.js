import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connectDB from "@/db/connectDb";

// console.log(process.env.GOOGLE_ID)

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user,user:email",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      scope: "read:user, user:email",
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      
      if (account.provider === "github" || account.provider == "google") {
        try {
          await connectDB();

          const currentUser = await User.findOne({ email: user.email });
          console.log(currentUser)
          if (!currentUser) {
            const newUser = await User.create({
              email: user.email,
              username: user.email.split("@")[0],
              name: user.name || "Default Name",
            });
          } 
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
    },
    async session({ session }) {
      try {
        await connectDB();
        // console.log(session.user)
        const dbUser = await User.findOne({ email: session.user.email });
        // console.log(dbUser)
        if (dbUser) {
          session.user.name = dbUser.username;
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
});

export { authoptions as GET, authoptions as POST };

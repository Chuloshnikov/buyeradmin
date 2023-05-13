import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // Налаштуйте провайдера у відповідності до вашого методу авторизації
      async authorize(credentials) {
        // Перевірте ваші облікові дані для авторизації
        if (credentials.username === process.env.ADMIN_USERNAME && credentials.password === process.env.ADMIN_PASSWORD) {
          // Поверніть об'єкт з даними авторизованого користувача.
          // Ці дані будуть доступні у вашому компоненті Next.js
          return { id: 1, name: 'Admin' }
        }
        // Поверніть null, якщо авторизація не вдалася
        return null
      },
    }),
  ],
}

export default (req, res) => NextAuth(req, res, options)
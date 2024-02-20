import NextAuth from 'next-auth'
import { options } from './options'

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Username', type: 'Text', placeholder: 'test' },
//         password: { label: 'Password', type: 'password' },
//       },
//
//       async authorize(credentials, req) {
//         if (!credentials?.username || !credentials.password) {
//           return null
//         }
//
//         try {
//           const user = await login(credentials.username, credentials.password)
//           return user
//         } catch (e) {
//           console.log(e)
//           return null
//         }
//       },
//     }),
//   ],
// })

const handler = NextAuth(options)

export { handler as GET, handler as POST }

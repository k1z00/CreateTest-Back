import type { SignInUserPayload, SignUpUserPayload } from '~/models/auth'
import type { User } from '~/models/user'
import { sign } from 'hono/jwt'
import { prisma } from '~/prisma'
// import { sendVerificationCode } from '~/utils/email'

class AuthService {
  signUp = async (payload: SignUpUserPayload) => {
    // TODO
    // const storedCode = await prisma.emailVerificationCode.findFirst({
    //   where: { email: payload.email },
    // })
    // if (!storedCode || storedCode.code !== payload.email_verification_code) {
    //   throw new Error('Invalid verification code')
    // }

    const hashedPassword = await Bun.password.hash(payload.password)

    try {
      await prisma.user.create({
        data: {
          email: payload.email,
          password: hashedPassword,
        },
      })
      const { token, user } = await this.signIn(payload)

      return { token, user }
    }
    catch (error) {
      throw new Error(`Cannot create user ${error}`)
    }
  }

  signIn = async (payload: SignInUserPayload) => {
    const user = await prisma.user.findFirstOrThrow({ where: { email: payload.email } })
    const isPasswordValid = await Bun.password.verify(payload.password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }

    const secret = process.env.JWT_SECRET!
    const jwtPayload = {
      sub: user.id,
      // exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
    }
    const token = await sign(jwtPayload, secret)
    const transformedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as User

    return { token, user: transformedUser }
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  createVerificationCode = async (email: string) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const code = Math.random().toString(36).substring(2, 8)

    // TODO
    // await prisma.emailVerificationCode.create({
    //   data: {
    //     email,
    //     code,
    //   },
    // })
    // await sendVerificationCode(email, code)
  }
}

export { AuthService }

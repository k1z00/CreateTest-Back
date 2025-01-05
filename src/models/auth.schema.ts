import { z } from '@hono/zod-openapi'
import { UserSchema } from './user.schema'

const AuthUserSchema = z.object({
  token: z.string(),
  user: UserSchema,
})

const SignUpUserPayloadSchema = z.object({
  email: z.string().email(),
  email_verification_code: z.string(),
  password: z.string().min(8).max(20),
})

const SignInUserPayloadSchema = z.object({
  email: z.string().email().default('test@test.test'),
  password: z.string().min(8).max(20).default('testtesttest'),
})

export {
  AuthUserSchema,
  SignInUserPayloadSchema,
  SignUpUserPayloadSchema,
}

import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType, Image } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import logo from "../../../public/logo.svg"
import { motion } from "framer-motion"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <motion.div
      layoutId="header"
      className="h-screen p-10 flex justify-center items-center bg-pink-500"
    >
      <div className="w-full">
        <Image src={logo} alt="baby diary" className="block mb-4" />

        <Form
          submitButtonClassName="bg-pink-100 text-pink-500"
          submitText="Login"
          schema={Login}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              const user = await loginMutation(values)
              props.onSuccess?.(user)
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <LabeledTextField
            className="bg-pink-400 placeholder-pink-200 text-pink-100"
            name="email"
            label=""
            placeholder="Email"
          />
          <LabeledTextField
            className="bg-pink-400 placeholder-pink-200 text-pink-100"
            name="password"
            label=""
            placeholder="Password"
            type="password"
          />
          <div className="my-4 text-center text-pink-200">
            <Link href={Routes.ForgotPasswordPage()}>
              <a>Forgot your password?</a>
            </Link>
          </div>
        </Form>

        <div className="my-2 text-center">
          <div className="text-pink-200 bg-pink-400 p-2 rounded-lg">
            <Link href={Routes.SignupPage()}>Sign Up</Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoginForm

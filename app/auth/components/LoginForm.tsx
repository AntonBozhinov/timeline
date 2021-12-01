import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className="h-screen p-10 flex justify-center items-center bg-gray-800">
      <div className="w-full">
        <h1 className="text-center text-xl my-2 text-gray-200">Login to Timeline</h1>

        <Form
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
          <LabeledTextField name="email" label="" placeholder="Email" />
          <LabeledTextField name="password" label="" placeholder="Password" type="password" />
          <div className="my-4 text-center text-blue-500">
            <Link href={Routes.ForgotPasswordPage()}>
              <a>Forgot your password?</a>
            </Link>
          </div>
        </Form>

        <div className="my-2 text-center">
          <div className="text-blue-500 bg-gray-700 p-2 rounded-lg">
            <Link href={Routes.SignupPage()}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm

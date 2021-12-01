import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className="h-screen p-10 flex justify-center bg-gray-800 items-center">
      <div className="w-full">
        <h1 className="text-center text-xl my-2 text-gray-200">Create an Account</h1>

        <Form
          submitText="Create Account"
          schema={Signup}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await signupMutation(values)
              props.onSuccess?.()
            } catch (error: any) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                // This error comes from Prisma
                return { email: "This email is already being used" }
              } else {
                return { [FORM_ERROR]: error.toString() }
              }
            }
          }}
        >
          <div className="mb-6">
            <LabeledTextField name="email" label="" placeholder="Email" />
            <LabeledTextField name="password" label="" placeholder="Password" type="password" />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SignupForm

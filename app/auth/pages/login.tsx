import { useRouter, BlitzPage, Image } from "blitz"
import { LoginForm } from "app/auth/components/LoginForm"
import { AnimateSharedLayout } from "framer-motion"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
        }}
      />
    </div>
  )
}

LoginPage.suppressFirstRenderFlicker = true
LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <AnimateSharedLayout>{page}</AnimateSharedLayout>
export default LoginPage

import { motion } from "framer-motion"
import { useMutation } from "blitz"
import logout from "../../auth/mutations/logout"
import { SideNavToggle } from "./SideNav"

const header = {
  initial: {
    height: "100vh",
    clipPath: "ellipse(200% 200% at 0% 0%)",
  },
  animate: {
    height: "100%",
    clipPath: "ellipse(85% 100% at 50% 0%)",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
}
const headerTitle = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
}

interface Props {
  title?: string
}

export const Header = ({ title }: Props) => {
  const [logoutMutation] = useMutation(logout)
  return (
    <motion.div
      layoutId="header"
      initial="initial"
      animate="animate"
      variants={header}
      className="bg-pink-500 relative w-full"
    >
      <div className="mx-auto px-4 py-16">
        <SideNavToggle onClick={async () => await logoutMutation()} />
        <motion.h1 variants={headerTitle} className="text-4xl font-bold text-white">
          {title}
        </motion.h1>
      </div>
    </motion.div>
  )
}

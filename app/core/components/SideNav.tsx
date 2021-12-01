import { useMutation } from "blitz"
import { Suspense } from "react"
import { reveal as Menu } from "react-burger-menu"
import logout from "../../auth/mutations/logout"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { FaBars } from "react-icons/fa"
import { motion } from "framer-motion"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const letter = currentUser?.email.charAt(0).toUpperCase()

  return (
    <div>
      <div className="w-16 h-16 m-auto rounded-full text-center bg-blue-500 text-white">
        <div className="text-xl w-full h-full flex justify-center items-center">
          <span className="block">{letter}</span>
        </div>
      </div>
      <h1 className="text-base text-center mt-4">{currentUser?.email}</h1>
    </div>
  )
}

const toggleVariants = {
  initial: {
    x: "1000%",
  },
  animate: {
    x: 0,
  },
}

interface SideNavToggleProps {
  onClick?: () => void
}

export const SideNavToggle = ({ onClick = () => {} }: SideNavToggleProps) => {
  return (
    <motion.div
      variants={toggleVariants}
      onClick={onClick}
      className="absolute z-50 right-2 top-2 w-16 h-16 m-auto rounded-full flex justify-center items-center text-center bg-pink-500 text-white"
    >
      <FaBars className="text-2xl" />
    </motion.div>
  )
}

export const SideNav = () => {
  const [logoutMutation] = useMutation(logout)

  const handleLogout = async () => await logoutMutation()
  return (
    <Menu right pageWrapId="page-wrap" outerContainerId="outer-container">
      <Suspense fallback={<div>Loading...</div>}>
        <UserInfo />
      </Suspense>

      <button
        className="p-1 rounded-lg text-center text-sm w-full bg-gray-700 mt-4"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </Menu>
  )
}

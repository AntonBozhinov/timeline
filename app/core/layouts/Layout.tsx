import { Head, BlitzLayout } from "blitz"
import { Header } from "../components/Header"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title || "Baby Diary"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title={title} />
      <main>{children}</main>
    </div>
  )
}
Layout.authenticate = true

export default Layout

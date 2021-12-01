import { Head, BlitzLayout, Routes } from "blitz"
import { Suspense } from "react"
import { SideNav } from "../components/SideNav"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <div id="outer-container">
      <Head>
        <title>{title || "timeline"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideNav />
      <main id="page-wrap" className="bg-gray-100 min-h-screen">
        <h1 className="text-center py-3 text-xl font-bold">{title}</h1>
        {children}
      </main>
    </div>
  )
}
Layout.authenticate = true

export default Layout

import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

const Home: BlitzPage = () => {
  return (
    <div className="h-full">
      <div className="text-cente">home</div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Timelines">{page}</Layout>

export default Home

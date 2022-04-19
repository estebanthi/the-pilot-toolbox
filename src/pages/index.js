import Layout from "../components/layout/Layout";

import styles from '../../styles/Home.module.css'


export default function Home() {
  return (
    <div>
      <p>Hello !</p>
    </div>
  )
}

Home.getLayout = function getLayout(page){

    return (
        <Layout>{page}</Layout>
    )

}
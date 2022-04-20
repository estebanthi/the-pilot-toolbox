import Image from "next/image";

import Layout from "../components/layout/Layout";

import styles from '../../styles/Home.module.css'
import ArrowButton from "../components/buttons/arrow-button/ArrowButton";
import HomeSection from "../components/sections/home-section/HomeSection";


export default function Home() {
  return (
    <div className={styles.home}>

      <div className={styles.titleContainer}>
          <div className={styles.titleSection}>
              <h3>Le pilotage accessible à tous.</h3>
              <p>Préparez vos examens aéronautiques simplement et rapidement.</p>
              <ArrowButton text="Découvrir" href="/qcm"/>
          </div>
          <div className={styles.titleImage}>
              <Image src="/assets/avion de face.png" width={300} height={217} layout="responsive"/>
          </div>
      </div>

        <HomeSection title="Réussissez vos examens aéronautiques"
                     left={true}
                     text="Vous souhaitez réussir votre PPL(A), ou votre PPL(H) ? Ou bien votre ATPL ?
                      Retrouvez des QCM pour vous entraîner à passer vos examens théoriques."
                     image={<Image src="/assets/exam test.png" layout="responsive" width={300} height={225}/>}
                     buttonText="M'entraîner"
                     buttonHref="/qcm"
        />

        <HomeSection title="Suivez votre progression"
                     right={true}
                     text="Accédez à votre profil et suivez votre progression avec votre historique de scores et des graphiques, et fixez vous des objectifs."
                     image={<Image src={"/assets/dashboard.jpg"} layout="responsive" width={300} height={225}/>}
                     buttonText="Mon profil"
                     buttonHref="/profile"
        />

    </div>
  )
}

Home.getLayout = function getLayout(page){

    return (
        <Layout>{page}</Layout>
    )

}
import Layout from "../../components/layout/Layout";
import {Grid} from "@mui/material";
import Category from "../../components/category/Category";

import Image from "next/image";

import styles from "../../../styles/QCMPage.module.css"


export default function QCMPage() {

    return (
        <div className={styles.container}>
            <h1 className={"pageTitle"}>QCM</h1>
            <div className={styles.categoriesContainer}>
            <h2>Catégories</h2>
            <Grid container spacing={10} alignItems="flex-end">

                <Category image={<Image src="/assets/avion de face.png" width={300} height={217}/>}
                          title="PPL (A)" categorySlug="ppl-a"/>

                <Category image={<Image src="/assets/plane upper view.png" width={300} height={217}/>}
                          title="ABL" categorySlug="abl"/>
                
                <Category image={<Image src="/assets/profile plane.png" width={300} height={130}/>}
                          title="ULM" categorySlug="ulm"/>
                
                <Category image={<Image src={"/assets/helicopter.png"} width={300} height={130}/>}
                          title="PPL (H)" categorySlug="ppl-h"/>

                <Category image={<Image src="/assets/airliner.png" width={300} height={130}/>}
                          title="ATPL" categorySlug="atpl"/>

                <Category image={<Image src="/assets/teacher.jpg" width={100} height={100}/>}
                          title="CAEA" categorySlug="caea"/>

                <Category image={<Image src="/assets/drone.png" width={100} height={100}/>}
                          title="Pilotage de drone" categorySlug="drone" xs={6}/>

                <Category image={<Image src="/assets/book.jpg" width={130} height={80}/>}
                          title="BIA" categorySlug="bia" xs={6}/>

            </Grid>
            </div>
        </div>
    )

}


QCMPage.getLayout = function getLayout(page){

    return (
        <Layout>{page}</Layout>
    )

}
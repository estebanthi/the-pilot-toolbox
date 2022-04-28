import Layout from "../../components/layout/Layout";
import {Grid} from "@mui/material";
import Category from "../../components/category/Category";

import Image from "next/image";

import styles from "../../../styles/QCMPage.module.css"
import {getAllCategories} from "../../../services/qcm";
import {useEffect, useState} from "react";


export default function QCMPage(props) {


    return (
        <div className={styles.container}>

        </div>
    )

}


QCMPage.getLayout = function getLayout(page){

    return (
        <Layout>{page}</Layout>
    )

}

export async function getServerSideProps({params}) {
    return {
        props: {categories: "categories"}
    }
}
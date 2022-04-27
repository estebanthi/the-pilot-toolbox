import Layout from "../../components/layout/Layout";
import {Grid} from "@mui/material";
import Category from "../../components/category/Category";

import Image from "next/image";

import styles from "../../../styles/QCMPage.module.css"
import {getAllCategories} from "../../../services/qcm";
import {useEffect, useState} from "react";


export default function QCMPage(props) {

    const [categories, setCategories] = useState([])

    useEffect(() => {

        const get = async () => {
            const categories = await getAllCategories()
            setCategories(categories)
        }

        get()

    }, [])

    return (
        <div className={styles.container}>
            <h1 className={"pageTitle"}>QCM</h1>
            <div className={styles.categoriesContainer}>
            <h2>Catégories</h2>
            <Grid container spacing={10} alignItems="flex-end">
                {categories.map((category) =>
                    <Category key={category._id} image={<Image src={category.image_url}
                                            width={category.image_dimensions[0]}
                                            height={category.image_dimensions[1]}/>}
                              category={category}/>)}
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

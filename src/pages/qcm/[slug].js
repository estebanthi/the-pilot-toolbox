import Layout from "../../components/layout/Layout";
import {getAllCategories, getCategory, getQcmsFromOptions, getThemes} from "../../../services/qcm";
import DemoAlert from "../../components/alerts/demo alert/DemoAlert";

import styles from "../../../styles/CategoryPage.module.css"
import QCMNumberPicker from "../../components/sections/qcm number picker/QCMNumberPicker";
import {useEffect, useState} from "react";
import QCMType from "../../components/sections/qcm type/QCMType";
import QCMThemesPicker from "../../components/sections/qcm themes/QCMThemesPicker";
import BasicButton from "../../components/buttons/basic-button/BasicButton";
import ErrorAlert from "../../components/alerts/error alert/ErrorAlert";
import {useRouter} from "next/router";
import Spinner from "../../components/spinner/Spinner";


const CategoryPage = (props) => {

    const [qcmNumber, setQcmNumber] = useState(0)
    const [qcmType, setQcmType] = useState(0)
    const [themes, setThemes] = useState([])

    const [options, setOptions] = useState()

    const [spinner, setSpinner] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setOptions({
            number: qcmNumber,
            type: qcmType,
            themes: themes,
            category: props.category._id
        })
    }, [themes, qcmNumber, qcmType])

    const generate = async () => {

        if (!themes.length && props.category.themes.length > 0) {
            return
        }

        setSpinner(true)
        const qcms = await getQcmsFromOptions(options)
        const queries = qcms.map((qcm) => qcm._id)
        router.push({pathname: '/qcms', query: {ids: queries.join('-')}}, '/qcms')
    }

    return (
        <div className={styles.container}>
            <h1 className="pageTitle">{props.category.title}</h1>
            <div className={styles.demo}><DemoAlert/></div>
            <div className={styles.configuratorsContainer}>
                <QCMNumberPicker handleChange={setQcmNumber}/>
                <QCMType handleChange={setQcmType} options={options}/>
                {props.category.themes.length > 0 && <QCMThemesPicker themes={props.category.themes} handleChange={setThemes}/>}
                <div className={styles.generate}>
                    <BasicButton onClick={generate} text="Générer"/>
                    {spinner && <div className={styles.spinner}>
                        <Spinner/>
                    </div>}
                </div>
            </div>
        </div>
    )

}

export default CategoryPage


CategoryPage.getLayout = function getLayout(page){

    return (
        <Layout>{page}</Layout>
    )

}


export async function getStaticPaths() {
    const categories = await getAllCategories()
    return {
        paths: categories.map((category) => ({params: {slug: category.slug}})),
        fallback: true,
    }
}


export async function getStaticProps({params}) {
    const categoryInfo = await getCategory(params.slug)
    const themes = await getThemes(categoryInfo._id)
    return {
        props: {category: {_id: categoryInfo._id, title: categoryInfo.title, themes: themes}}
    }
}
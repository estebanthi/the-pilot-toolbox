import Layout from "../../components/layout/Layout";
import {getAllCategories, getCategory, getThemes} from "../../../services/qcm";
import DemoAlert from "../../components/alerts/demo alert/DemoAlert";

import styles from "../../../styles/CategoryPage.module.css"
import QCMNumberPicker from "../../components/sections/qcm number picker/QCMNumberPicker";
import {useState} from "react";
import QCMType from "../../components/sections/qcm type/QCMType";
import QCMThemesPicker from "../../components/sections/qcm themes/QCMThemesPicker";
import BasicButton from "../../components/buttons/basic-button/BasicButton";
import ErrorAlert from "../../components/alerts/error alert/ErrorAlert";


const CategoryPage = (props) => {

    const [qcmNumber, setQcmNumber] = useState(0)
    const [qcmType, setQcmType] = useState(0)
    const [themes, setThemes] = useState([])

    const generate = () => {

        if (!themes.length) {
            return
        }

        const options = {
            number: qcmNumber,
            type: qcmType,
            themes: themes
        }
        console.log(options)
    }

    return (
        <div>
            <h1 className="pageTitle">{props.category.title}</h1>
            <div className={styles.alert}>
                <DemoAlert/>
            </div>
            <div className={styles.configuratorsContainer}>
                <QCMNumberPicker handleChange={setQcmNumber}/>
                <QCMType handleChange={setQcmType}/>
                {props.category.themes.length > 0 && <QCMThemesPicker themes={props.category.themes} handleChange={setThemes}/>}
                <div className={styles.generate}>
                    <BasicButton onClick={generate} text="Générer"/>
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
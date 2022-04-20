import Layout from "../../components/layout/Layout";
import QCMPage from "./index";

const CategoryPage = (props) => {

    return (
        <div>
            Ok
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
    const categories = ['ppl-a', 'abl', 'ulm', 'ppl-h', 'atpl', 'caea', 'drone', 'bia']

    return {
        paths: categories.map((category) => ({params: {slug: category}})),
        fallback: true,
    }
}

export async function getStaticProps({params}) {


    return {
        props: { title: params.slug }
    }
}
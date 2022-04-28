import Layout from "../../components/layout/Layout";
import axios from "axios";
import QCMQuestion from "../../components/sections/qcm question/QCMQuestion";


export default function QCMsPage (props) {

    return (
        <div>
            {props.qcms && props.qcms.map((qcm, index) => <QCMQuestion key={qcm._id} qcm={qcm} index={index+1} />)}
        </div>
    )

}

QCMsPage.getLayout = function getLayout(page){

    return (
        <Layout>{page}</Layout>
    )

}

export async function getServerSideProps(context) {
    const ids = context.query.ids
    let qcms = []
    if (ids) {
        const parsedIds = parseIds(ids)
        for (let i = 0; i < parsedIds.length; i++) {
            const qcm = await axios.get((process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL)+"/api/qcms", {params: {_id: parsedIds[i]}})
                .then((qcm) => qcm.data[0])
            qcms.push(qcm)
        }
    }

    return {
        props: {qcms: qcms}
    }
}

const parseIds = (ids) => {
    return ids.split('-')
}
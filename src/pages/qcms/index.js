import Layout from "../../components/layout/Layout";
import axios from "axios";
import QCMQuestion from "../../components/sections/qcm question/QCMQuestion";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";


export default function QCMsPage (props) {

    const router = useRouter()
    const {ids} = router.query

    const [qcms, setQcms] = useState([])

    useEffect(() => {

        if (!ids) {
            return
        }

        const setData = async () => {
            let qcms = []
            if (ids) {
                const parsedIds = parseIds(ids)
                qcms = await axios.get("/api/qcms", {params: {"_id": parsedIds}})
                    .then((qcm) => qcm.data[0])
            }
            setQcms(qcms)
        }
        setData()

    }, [ids])

    return (
        <div>
            {qcms.length > 0 && qcms.map((qcm, index) => <QCMQuestion key={qcm._id} qcm={qcm} index={index+1} />)}
        </div>
    )

}

QCMsPage.getLayout = function getLayout(page){

    return (
        <Layout>{page}</Layout>
    )

}


const parseIds = (ids) => {
    return ids.split('-')
}
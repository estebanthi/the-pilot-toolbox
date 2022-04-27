import axios from "axios";
import {getSession} from "next-auth/react";
import {getUser} from "./auth";

export const getAllCategories = async () => {
    const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL+"/api/categories")
    return res.data
}

export const getCategory = async (slug) => {
    const res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL+"/api/categories", {params: {slug: slug}})
    return res.data[0]
}

export const getThemes = async (categoryId) => {
    const res = await axios.get("/api/themes", {params: {category: categoryId}})
    return res.data
}

export const getQcmsFromOptions = async (options) => {
    let qcms = await axios.get('/api/qcms',
        {params: {category: options.category}})
        .then((res) => res.data)

    qcms = qcms.filter((qcm) => options.themes.includes(qcm.theme) || options.themes.length == 0)
        .slice(0, options.number)

    const session = await getSession()

    qcms.sort(() => Math.random() - 0.5)

    if (!session) {
        return qcms
    }
    const user = await getUser(session.user.email)

    switch (options.type) {
        case 0:
            return qcms
        case 1:
            return qcms.filter((qcm) => (!user.seen_qcms.includes(qcm) || user.failed_qcms.includes(qcm)))
        case 2:
            return qcms.filter((qcm) => user.seen_qcms.includes(qcm._id))
        case 3:
            return qcms.filter((qcm) => user.marked_qcms.includes(qcm._id))
        default:
            return qcms
    }
    return qcms
}
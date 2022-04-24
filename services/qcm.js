import axios from "axios";

export const getAllCategories = async () => {
    const res = await axios.get(process.env.BASE_URL+"/api/categories")
    return res.data
}

export const getCategory = async (slug) => {
    const res = await axios.get(process.env.BASE_URL+"/api/categories", {params: {slug: slug}})
    return res.data[0]
}

export const getThemes = async (categoryId) => {
    const res = await axios.get(process.env.BASE_URL+"/api/themes", {params: {category: categoryId}})
    return res.data
}

export const getQcmNbForCategory = async (category) => {

}
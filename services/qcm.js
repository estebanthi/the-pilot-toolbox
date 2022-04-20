import axios from "axios";

export const getAllCategories = async () => {
    const res = await axios.get(process.env.BASE_URL+"/api/categories")
    return res.data
}
import axios from "axios";


export const getCatList = async (authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/categories`, {}, {
    });

}
export const updateCat = async (slug,category,authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`,category,  {        
        headers:{
        authtoken,
    },
    });

}
export const deleteCat = async (slug,authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
        headers:{
            authtoken,
        },
    }, {
    });

}
export const getCat = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`, {
    });

}
export const createCat = async (category,authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/category/`,category, { 
             headers:{
        authtoken,
    },
    });

}

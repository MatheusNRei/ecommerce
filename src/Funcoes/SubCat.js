import axios from "axios";


export const getSubCatList = async (authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/SubCats`, {}, {
    });

}
export const updateSubCat = async (slug,category,authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/SubCat/${slug}`,SubCat,  {        
        headers:{
        authtoken,
    },
    });

}
export const deleteSubCat = async (slug,authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/SubCat/${slug}`, {
        headers:{
            authtoken,
        },
    }, {
    });

}
export const getSubCat = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/SubCat/${slug}`, {
    });

}
export const createSubCat = async (category,authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/SubCat/`,SubCat, { 
             headers:{
        authtoken,
    },
    });

}

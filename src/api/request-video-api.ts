import axios from "axios"


export const requestVideo = async (id: string)=> {
    try {
        const response = await axios.post('/record', {id});
        const data = response.data;

        return data;
    } catch(err) {
        console.error(err);

        return null;
    }
};
import axios from "axios"


export const getUserData = async (id: string)=> {
    try {
        const response = await axios.post('/get-user-data', {id});

        const data = response.data;

        return data;

    } catch(error) {

        console.error(error);

        return null;
    }
};
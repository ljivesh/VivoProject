import axios from "axios";



export const  uploadBulkData = async (file: File)=> {

    try {
        
            const formData = new FormData();
            formData.append('file', file);
        
            const response = await axios.post('/uploadRetailerData', formData, {
                headers: {
                    'Content-Type': 'mulitpart/form-data'
                }
            });
        
            const data = response.data;
        
            return data;

    } catch(error) {
        console.error(error);

        return null;
    }

}   
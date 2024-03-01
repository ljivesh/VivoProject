import axios from "axios"


export type VideoRequestData = {
    modelURL: string | undefined,
    animationURL: string,
    script: string,
    voice: string,
    name: string,
    number: string,
};


export const saveVideoData = async (data: VideoRequestData)=> {

    try {
        const response = await axios.post('/save-video-data', data);

        const responseData = response.data;

        return responseData;
    } catch(error) {

        console.error(error);

        return null;
    }

};
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SpeechConfig } from "microsoft-cognitiveservices-speech-sdk";

type SpeechTokenObject = {
  authToken: string;
  region: string;
};

export async function getToken() {
  // const cookie = new Cookie();

    const res = await axios.get("/api/speech/get-speech-token");
    const authToken = res.data.token;
    const region = res.data.region;

    const speechTokenObject: SpeechTokenObject = { authToken, region };
    // localStorage.set('speech-token', speechTokenObject);

    // console.log('Token fetched from back-end: ' + token);
    return speechTokenObject;
  
  // const speechToken: SpeechTokenObject = localStorage.get('speech-token');

  // if (speechToken === undefined) {
  // } else {
  //     console.log('Token fetched from cookie: ' + speechToken);
  //     // const idx = speechToken.indexOf(':');
  //     return speechToken;
  // }
}

// export const useSpeechConfig = () => {

//     const [speechConfig, setSpeechConfig] = useState(null);

//     useEffect(() => {
//         const refreshConfig = async () => {
//             const { authToken, region } = await getToken();
//             const config = SpeechConfig.fromAuthorizationToken(authToken, region);
//             config.speechRecognitionLanguage = 'en-US';
//             setSpeechConfig(config);
//         };
//          // Fetch the token immediately
//          refreshConfig();

//          // Then fetch the token every 9 minutes (540 seconds)
//          // Adjust the interval as needed based on the token's actual expiration time
//          const intervalId = setInterval(refreshConfig, 540 * 1000);

//          // Clear the interval when the component is unmounted
//          return () => clearInterval(intervalId);
//     }, []);

//     return { speechConfig };
// }

export const useSpeechConfig = () => {
    // const [ready, setReady] = useState(false);
  const { data, status } = useQuery({
    queryKey: ['speech-token'],
    queryFn: getToken,
    refetchInterval: 540*1000,
    refetchIntervalInBackground: true
  });


  const speechConfig = useMemo(() => {
    if (status === "success") {
    //   setReady(true);
      return SpeechConfig.fromAuthorizationToken(data.authToken, data.region);
    }

    if (status === "error") {
        // setReady(false);
    }
    
    if (status === "pending") {
    //   setReady(false);
    }

    return null;
  }, [data, status]);

  return { speechConfig };
};

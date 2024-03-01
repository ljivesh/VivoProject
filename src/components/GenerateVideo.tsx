import { FC, useState } from "react";
import GenerateVideoForm from "@/components/GenerateVideoForm";
import VivoLogo from "@/assets/Vivo_mobile_logo.png";
import { ArrowLeft, LogOut, Loader } from "lucide-react";
import AvatarCreate from "./AvatarCreate";
import { Button } from "./ui/button";
import { useAuth } from "@/providers/auth-provider";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle } from "./ui/card";
import UserInfoForm from "./UserInfoForm";
import { useForm } from "react-hook-form";
import { userInfoSchema } from "@/schemas/UserInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { GenerateFormSchemaType } from "@/schemas/GenerateVideoFormSchema";
import { regionalScripts } from "@/scripts";
import { langTermMap, voiceMappings } from "@/mappings/languageMapping";
import { AvatarExportedEventPayload } from "@readyplayerme/react-avatar-creator";
import axios from "axios";
import { animtaionURls } from "@/data";
import { saveVideoData } from "@/api/save-video-data-api";
import { requestVideo } from "@/api/request-video-api";

const GenerateVideo = () => {
  const { user, logout } = useAuth();

  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const [avatar, setAvatar] = useState<AvatarExportedEventPayload | null>(null);

  const [generating, setGenerating] = useState(false);

  const [status, setStatus] = useState("");

  const form = useForm({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: "",
      number: "",
      store: "",
    },
  });

  const generateVideoHandler = async (data: GenerateFormSchemaType) => {
    console.log(
      data,
      form.watch("name"),
      form.watch("number"),
      form.watch("store")
    );

    let selectedTemplate = regionalScripts.find((script)=> script['S.No'] === Number(data.script)) || regionalScripts[0];
    

    let script = selectedTemplate[data.language].replace('[VBA_NAME]', form.watch('name'));

    if(user.type === 'retailer') script = script.replace('[STORE_NAME]', form.watch('store'));

    if(data.customerName !== "") script = script.replace('[Customer_Name]', data.customerName);

    console.log(script);

    

    const voiceSet = voiceMappings.languages[data.language];

    try {
      setGenerating(true);
  
  
      setStatus("Creating Video MetaData....");
  
      setTimeout(() => {
        setStatus("Rendering Video...");
  
        setTimeout(() => {
          setStatus("Downloading...");
  
        }, 5000);
      }, 5000);

      const avatarMetaResponse = await axios.get(`https://models.readyplayer.me/${avatar?.avatarId}.json`);
      const avatarMetaData = avatarMetaResponse.data;

      const gender: 'masculine' | 'feminine' = avatarMetaData.outfitGender;

      const animationURL = animtaionURls[gender];
      const modelURL = avatar?.url.slice(0, -4);
      console.log(modelURL, animationURL);

      const actualGender = langTermMap[gender];
      const voice = voiceSet[actualGender];

      console.log(voice);


      const videoRequestData = await saveVideoData({
        animationURL,
        voice,
        modelURL,
        name: form.watch('name'),
        number: form.watch('number'),
        script
      });

      if(videoRequestData) {

        const videoData = await requestVideo(videoRequestData.id);
        
        if(videoData) {
          
        }
        
      }
      
      setVideoUrl("https://vivo-youseai.s3.ap-south-1.amazonaws.com/merged_media/1709219828082_output.mp4");
      setAvatar(null);
      setTimeout(() => {
        setGenerating(false);
      }, 20000);

    } catch(err) {
      console.error(err);
    }



    

  };

  return (
    <div className="w-screen mt-10">
      <div className="flex flex-col items-center gap-4">
        <img src={VivoLogo} className="w-48" />
        <p className="text-xl ">Video Generator</p>
      </div>

      {generating ? (
        <div className="flex flex-col gap-10 h-screen text-3xl font-bold items-center justify-center">
          <Loader size={50} className="animate-spin-slow"/>
          <p>{status}</p>

        </div>
      ) : (
        <>
          <Form {...form}>
            <UserInfoForm />
          </Form>
        {!videoUrl ? <>
          {!avatar ? (
            <AvatarCreate setAvatar={setAvatar} />
          ) : (
            <div className="h-5/6 mt-10 flex justify-center">
              <Card className="w-3/4">
                <CardHeader>
                  <CardTitle>Generate new video</CardTitle>
                </CardHeader>
                <GenerateVideoForm handleGenerateVideo={generateVideoHandler} />
              </Card>
            </div>
          )}
        </> : 
        
        <div className="flex justify-center h-64 items-center">

        <a
        href={videoUrl}
        download="GeneratedVideo"
        target="_blank"
        rel="noreferrer"
      >
        <Button >Download</Button>
      </a>
        </div>}

          <div className="flex justify-around my-5 gap-4">
            {avatar && (
              <Button onClick={() => setAvatar(null)}>
                <ArrowLeft size={18} />
                <p className="ml-2">Back</p>
              </Button>
            )}
            <Button onClick={logout}>
              <LogOut size={18} /> <p className="ml-2">Sign Out </p>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default GenerateVideo;

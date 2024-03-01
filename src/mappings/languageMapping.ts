import { LanguageItem } from "@/types/language-types";

export const maleVoiceMappings: LanguageItem[] = [
  {
    value: "bn-IN-BashkarNeural",
    title: "Bengali",
  },
  {
    value: "gu-IN-NiranjanNeural",
    title: "Gujrati",
  },
  {
    value: "hi-IN-MadhurNeural",
    title: "Hindi",
  },
  {
    value: "kn-IN-GaganNeural",
    title: "Kannada",
  },
  {
    value: "mr-IN-ManoharNeural",
    title: "Marathi",
  },
  {
    value: "ta-IN-ValluvarNeural",
    title: "Tamil",
  },
  {
    value: "te-IN-MohanNeural",
    title: "Telugu",
  },
];

export const femaleVoiceMappings: LanguageItem[] = [
  {
    value: "bn-IN-TanishaaNeural",
    title: "Bengali",
  },
  {
    value: "gu-IN-DhwaniNeural",
    title: "Gujrati",
  },
  {
    value: "hi-IN-SwaraNeural",
    title: "Hindi",
  },
  {
    value: "kn-IN-SapnaNeural",
    title: "Kannada",
  },
  {
    value: "mr-IN-AarohiNeural",
    title: "Marathi",
  },
  {
    value: "ta-IN-PallaviNeural",
    title: "Tamil",
  },
  {
    value: "te-IN-ShrutiNeural",
    title: "Telugu",
  },
];

export const voiceMappings = {
  languages: {
    Bengali: {
      maleVoice: "bn-IN-BashkarNeural",
      femaleVoice: "bn-IN-TanishaaNeural",
    },
    Gujarati: {
      maleVoice: "gu-IN-NiranjanNeural",
      femaleVoice: "gu-IN-DhwaniNeural",
    },
    Hindi: {
      maleVoice: "hi-IN-MadhurNeural",
      femaleVoice: "hi-IN-SwaraNeural",
    },
    Kannada: {
      maleVoice: "kn-IN-GaganNeural",
      femaleVoice: "kn-IN-SapnaNeural",
    },
    Marathi: {
      maleVoice: "mr-IN-ManoharNeural",
      femaleVoice: "mr-IN-AarohiNeural",
    },
    Tamil: {
      maleVoice: "ta-IN-ValluvarNeural",
      femaleVoice: "ta-IN-PallaviNeural",
    },
    Telugu: {
      maleVoice: "te-IN-MohanNeural",
      femaleVoice: "te-IN-ShrutiNeural",
    },
    English: {
      maleVoice: "en-US-GuyNeural",
      femaleVoice: "en-US-AriaNeural",
    },
  },
};

type LangTermMap = {
  masculine: "maleVoice",
  feminine: "femaleVoice"
};

export const langTermMap: LangTermMap = {

  masculine: "maleVoice",
  feminine: "femaleVoice"

};
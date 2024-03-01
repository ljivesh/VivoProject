import { useSpeechConfig } from '@/lib/token-utils';
import { SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';
import { useMemo } from 'react';

export const useSynthesizer = ()=> {

    const {speechConfig } = useSpeechConfig();

    const speechSynthesizer = useMemo(()=> {
        if(speechConfig) {
            return new SpeechSynthesizer(speechConfig, undefined);
        }
        return null;
    }, [speechConfig]);
    
    return {speechSynthesizer};

}
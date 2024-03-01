import { Card } from "./ui/card";
import {
  AvatarCreator,
  AvatarCreatorConfig,
  AvatarExportedEvent,
  AvatarExportedEventPayload
} from "@readyplayerme/react-avatar-creator";

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: "fullbody",
  quickStart: false,
  language: "en",
};

type Props = {
  setAvatar: (link: AvatarExportedEventPayload) => void;
};
const AvatarCreate = ({ setAvatar }: Props) => {
  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    setAvatar(event.data);
  };

  return (
    <div className="flex justify-center">

    <div className="flex justify-center flex-col">
      <AvatarCreator
        className="h-[30rem] overflow-hidden"
        style={{touchAction: 'none'}}
        subdomain="avatar-creator-dbq4s4"
        config={config}
        onAvatarExported={handleOnAvatarExported}
      />
      <div className="bg-background w-full h-[30%] z-10 relative bottom-[6.5rem]"></div>
      <div className="bg-[#2d1130] w-20 h-20 z-10 relative bottom-[21.5rem] left-[13.5rem]"></div>
    </div>
    </div>
  );
};

export default AvatarCreate;

//2d1130
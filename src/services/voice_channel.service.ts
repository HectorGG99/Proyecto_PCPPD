import { SocketUser } from "@/models/socketUser";
import { voiceChannelSocket } from "@/socketio";
import { EventName } from "@/utils/event_name";
import { ResponseEventName } from "@/utils/response_event_name";

class VoiceChannelService {
  joinToVoiceChannel(uid: string, voiceChannelID: string) {
    voiceChannelSocket(uid).emit(EventName.JOIN, voiceChannelID);
  }

  usersInVoiceChannel(uid: string, voiceChannelID: string, onEvent: (users: SocketUser[]) => void) {
    voiceChannelSocket(uid).on(
      `${voiceChannelID}-${ResponseEventName.USERS_IN_VOICE_CHANNEL}`,
      payload => {
        console.log(Object.values(payload));
        onEvent(Object.values(payload));
      }
    );
  }
  
  emitUsers(uid: string, voiceChannelID: string){
    voiceChannelSocket(uid).emit(EventName.EMIT_USERS,voiceChannelID);
  }

  leaveVoiceChannel(uid: string){
    voiceChannelSocket(uid).emit(EventName.LEAVE);
  }
}

export default new VoiceChannelService();

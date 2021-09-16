import { auth } from "@/utils/firebase";
import presence from "@/services/presence.services";
import { Status } from "@/models/status";
/**
 * Clase que conecta con el Firebase Authentication
 */
class AuthService {
  /**
   * Funcion para cerrar sesión.
   * @returns [Promise] de la sesión cerrada
   */
  async logout(): Promise<void> {
    presence.setPresence(Status.OFFLINE, auth.currentUser?.uid);
    return await auth.signOut();
  }
}

export default new AuthService();

/**
 * Enum que contiene los diferentes tipos de coleccines presentes en la db
 */
export enum Collection{
    /**
     * Coleccion de usuarios
     */
    USERS = "usuarios",
    /**
     * Colección de espacios de trabajo
     */
    WORK_SPACE = "espacios_de_trabajo",
    /**
     * Colección de mensajes dentro de los espacios de trabajo
     */
    MESSAGES = "mensajes",
    /**
     * Colección de invitaciones dentro de los documentos de usuario
     */
    INVITATIONS = "invitaciones",
    /**
     * Colección de canales de texto
     */
    TEXT_CHANNEL = "canales_texto",
    /**
     * Colección de canales de voz
     */
    VOICE_CHANNEL = "canales_voz",
    /**
     * Colección de respuestas a candidatos dentro de documentos de llamadas
     */
    ANSWER_CANDIDATES = "answerCandidates",
    /**
     * Colección de ofertas a para una llamada
     */
    OFFER_CANDIDATES = "offerCandidates",
}


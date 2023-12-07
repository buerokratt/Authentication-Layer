export const SESSION_STORAGE_JWT_VERIFY = 'byk-verify-auth';
export const ASK_PERMISSION_BUTTON_TIMEOUT_MS = 60000;

export enum ROLES {
  ROLE_ADMINISTRATOR = 'ROLE_ADMINISTRATOR',
  ROLE_SERVICE_MANAGER = 'ROLE_SERVICE_MANAGER',
  ROLE_CUSTOMER_SUPPORT_AGENT = 'ROLE_CUSTOMER_SUPPORT_AGENT',
  ROLE_CHATBOT_TRAINER = 'ROLE_CHATBOT_TRAINER',
  ROLE_ANALYST = 'ROLE_ANALYST',
  ROLE_UNAUTHENTICATED = 'ROLE_UNAUTHENTICATED',
}

export enum RUUTER_ENDPOINTS {
  GET_ALL_ACTIVE_CHATS = '/cs-get-all-active-chats',
  GET_ALL_ENDED_CHATS = '/cs-get-all-ended-chats',
  CLAIM_CHAT = '/cs-claim-chat',
  REDIRECT_CHAT = '/cs-redirect-chat',
  END_CHAT = '/cs-end-chat',
  POST_MESSAGE = '/cs-post-message',
  POST_EVENT_MESSAGE = '/cs-post-event-message',
  POST_FORWARD_REQUEST = '/cs-post-redirect-request-message',
  REMOVE_ATTACHED_CHATS = '/cs-remove-attached-chats',
  POST_MESSAGE_WITH_NEW_EVENT = '/cs-post-message-with-new-event',
}

export const ROLE_MATRIX = [
  {
    Role: ROLES.ROLE_ADMINISTRATOR,
    url: '/administration',
  },
  {
    Role: ROLES.ROLE_SERVICE_MANAGER,
    url: '/chats',
  },
  {
    Role: ROLES.ROLE_CUSTOMER_SUPPORT_AGENT,
    url: '/chats',
  },
  {
    Role: ROLES.ROLE_CHATBOT_TRAINER,
    url: '/',
  },
  {
    Role: ROLES.ROLE_ANALYST,
    url: '/',
  },
  {
    Role: ROLES.ROLE_UNAUTHENTICATED,
    url: '/',
  },
];

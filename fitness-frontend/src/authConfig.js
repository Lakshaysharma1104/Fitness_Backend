export const authConfig = {
    clientId: 'oAuth-pkce-client',
    authorizationEndpoint: 'http://localhost:8181/realms/Fitness-app/protocol/openid-connect/auth',
    tokenEndpoint: 'http://localhost:8181/realms/Fitness-app/protocol/openid-connect/token',
    redirectUri: 'http://localhost:5173',
    scope: 'openid profile email offline_access',
    onRefreshTokenExpire: (event) => event.logIn(),
  }
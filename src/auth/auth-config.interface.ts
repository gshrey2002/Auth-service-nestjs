// auth-config.interface.ts
export interface AuthConfig {
  jwtSecret: string;
  jwtExpirationTime: string;
  bcryptSaltOrRound: number | string;
  refreshTokenExpirationTime: string;
  accessTokenExpirationTime: string;
}

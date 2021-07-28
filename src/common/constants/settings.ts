// Application specific
export const SOCKET_PATH = '/run/podman/podman.sock';
export const SOCKET_BASE_URI = 'http://d/v3.0.0';

// Auth Specific
export const JWT_SECRET = process.env['PN_JWT_SECRET'];

export const GOOGLE_CLIENTID = process.env['OAUTH_GOOGLE_CLIENTID'];
export const GOOGLE_SECRET = process.env['OAUTH_GOOGLE_SECRET'];
export const GOOGLE_CALLBACK = process.env['OAUTH_GOOGLE_CALLBACK'];

export const DISCORD_CLIENTID = process.env['OAUTH_DISCORD_CLIENTID'];
export const DISCORD_SECRET = process.env['OAUTH_DISCORD_SECRET'];
export const DISCORD_CALLBACK = process.env['OAUTH_DISCORD_CALLBACK'];

// DB Specific
export const TYPEORM_SYNC_DB = process.env['TYPEORM_SYNC_DB'];

export const ADMIN_DOMAIN =
  process.env.MIX_APP_ENV == 'local'
    ? process.env.MIX_DEV_CENTRAL_DOMAIN
    : process.env.MIX_CENTRAL_DOMAIN;

export const TENANT_SOURCE = 'tenant';

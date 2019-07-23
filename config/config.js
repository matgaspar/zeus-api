const fs = require('fs');
const path = require('path');
const ms = require('ms');
require('dotenv').config();

const CONFIG = {
  app: process.env.APP || 'production',
  port: process.env.PORT || '7070',
  DB: {
    timezone: process.env.DB_TIMEZONE || 'Etc/GMT-3' || 'America/Sao_Paulo',
    dialect: process.env.DB_DIALECT || 'mariadb',
    host: process.env.DB_HOST || 'web7online.com',
    name: process.env.DB_NAME || 'webonl_api',
    user: process.env.DB_USER || 'webonl',
    port: process.env.DB_PORT || '3306',
    pass: process.env.DB_PASSWORD || 'gaspar15!',
  },
  JWT: {
    secretOrKey:
      fs.readFileSync(path.resolve('config', 'keys', 'jwtRS256.key'), 'utf8')
      || process.env.JWT_ENCRYPTION,
    secretPublic:
      fs.readFileSync(path.resolve('config', 'keys', 'jwtRS256.key.pub'), 'utf8')
      || process.env.JWT_ENCRYPTION,
    Options: {
      algorithm: 'RS256',
      expiresIn: process.env.JWT_EXPIRATION || ms('30d'),
      /* issuer: process.env.JWT_ISSUER || 'Web7Online',
      subject: process.env.JWT_SUBJECT || 'matheus@web7online.com',
      audience: process.env.JWT_AUDIENCE || 'http://web7online.com', */
    },
  },
};

module.exports = CONFIG;

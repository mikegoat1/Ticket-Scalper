require('dotenv').config();

const required = (key) => {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
};

module.exports = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  sessionSecret: required('SESSION_SECRET'),
  seatgeekClientId: required('SEATGEEK_CLIENT_ID'),
  ticketmasterApiKey: required('TICKETMASTER_API_KEY'),
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    jawsdbUrl: process.env.JAWSDB_URL,
  },
};

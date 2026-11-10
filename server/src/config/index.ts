import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const getEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

export default {
  node_env: getEnv("NODE_ENV"),
  port: getEnv("PORT"),
  database_url: getEnv("DATABASE_URL"),
  cloudinary: {
    cloud_name: getEnv("CLOUDINARY_CLOUD_NAME"),
    api_key: getEnv("CLOUDINARY_API_KEY"),
    api_secret: getEnv("CLOUDINARY_API_SECRET"),
  },
  jwt: {
    jwt_access_secret: getEnv("JWT_ACCESS_SECRET"),
    jwt_access_expiresIn: getEnv("JWT_ACCESS_EXPIRESIN"),
    jwt_refresh_secret: getEnv("JWT_REFRESH_SECRET"),
    jwt_refresh_expiresIn: getEnv("JWT_REFRESH_EXPIRESIN"),
    reset_secret: getEnv("RESET_SECRET"),
    reset_expiresIn: getEnv("RESET_EXPIRESIN"),
    reset_link: getEnv("RESET_LINK"),
    salt_round: getEnv("SALT_ROUND"),
  },
  //   openRouterApi: process.env.OPENROUTER_API_KEY,
  //   stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  //   emailSender: {
  //     email: process.env.NODEMAILER_MAIL,
  //     app_pass: process.env.GOOGLE_MAIL_PASSWORD,
  //   },
};

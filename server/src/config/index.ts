import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
//   cloudinary: {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   },
//   jwt: {
//     jwt_access_secret: process.env.JWT_ACCESS_SECRET,
//     jwt_access_expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
//     jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
//     jwt_refresh_expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
//     reset_secret: process.env.RESET_SECRET,
//     reset_expiresIn: process.env.RESET_EXPIRESIN,
//     reset_link: process.env.RESET_LINK,
//     salt_round: process.env.SALT_ROUND,
//   },
//   openRouterApi: process.env.OPENROUTER_API_KEY,
//   stripe_secret_key: process.env.STRIPE_SECRET_KEY,
//   emailSender: {
//     email: process.env.NODEMAILER_MAIL,
//     app_pass: process.env.GOOGLE_MAIL_PASSWORD,
//   },
};
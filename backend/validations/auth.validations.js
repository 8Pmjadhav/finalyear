import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";

// * Custom Error Reporter
vine.errorReporter = () => new CustomErrorReporter();

export const registerSchema = vine.object({
  username: vine.string().minLength(2).maxLength(8),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(50).confirmed(),
});

export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});

export const passwordSchema = vine.object({
  password:vine.string().minLength(8).maxLength(50).confirmed(),
})
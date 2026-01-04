import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
  password: z.string().min(1, {
    message: "Şifre gereklidir.",
  }),
});
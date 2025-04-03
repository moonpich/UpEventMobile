import { z } from "zod";

// Este archivo esta incompleto por favor de terminar, no estamos ocupando yup, estamos usando ZOD como habiamos acordado
// https://zod.dev/?id=installation  Documentacion de la buena
const userSchema = z.object({
  email: z.string().email(),
});

export function partialUser({ user }) {
  return userSchema.partial().safeParse(user);
}

export function completedUser({ user }) {
  return userSchema.safeParse(user);
}

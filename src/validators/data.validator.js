
import { z } from "zod";

export const dataSchema = z.object({
  payload: z.record(z.any()),
});
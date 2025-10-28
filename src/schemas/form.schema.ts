import * as z from "zod";

export const FormSchema = z.object({
  currentCity: z
    .object({
      name: z.string(),
      country: z.string(),
      lat: z.number(),
      lon: z.number(),
    })
    .nullish(),
  start_date: z.date(),
  end_date: z.date().nullable(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

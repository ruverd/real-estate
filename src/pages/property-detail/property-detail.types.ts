import { z } from "zod";

import { contactFormSchema } from "./property-detail.schema";

export type ContactFormValues = z.infer<typeof contactFormSchema>;
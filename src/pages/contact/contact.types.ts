import { z } from "zod";

import { contactFormSchema } from "./contact.schema";

export type ContactFormValues = z.infer<typeof contactFormSchema>;

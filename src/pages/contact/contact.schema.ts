import { z } from "zod";

import { MAP_TEXTS } from "./contact.constants";

export const contactFormSchema = z.object({
  [MAP_TEXTS.FORM.NAME.FIELD_NAME]: z.string().min(2, { message: MAP_TEXTS.FORM.NAME.ERROR.MIN_LENGTH }),
  [MAP_TEXTS.FORM.EMAIL.FIELD_NAME]: z.string().email({ message: MAP_TEXTS.FORM.EMAIL.ERROR.INVALID }),
  [MAP_TEXTS.FORM.PHONE.FIELD_NAME]: z.string().min(10, { message: MAP_TEXTS.FORM.PHONE.ERROR.MIN_LENGTH }),
  [MAP_TEXTS.FORM.SUBJECT.FIELD_NAME]: z.string().min(5, { message: MAP_TEXTS.FORM.SUBJECT.ERROR.MIN_LENGTH }),
  [MAP_TEXTS.FORM.MESSAGE.FIELD_NAME]: z.string().min(10, { message: MAP_TEXTS.FORM.MESSAGE.ERROR.MIN_LENGTH }),
});
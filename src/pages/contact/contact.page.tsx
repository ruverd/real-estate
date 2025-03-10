import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import bgBlurredHouseUrl from "@/assets/blurred-house.jpg";
import { Hero } from "@/shared/components/hero";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

import { MAP_TEXTS } from "./contact.constants";
import { contactFormSchema } from "./contact.schema";
import type { ContactFormValues } from "./contact.types";

export const ContactPage = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      [MAP_TEXTS.FORM.NAME.FIELD_NAME]: "",
      [MAP_TEXTS.FORM.EMAIL.FIELD_NAME]: "",
      [MAP_TEXTS.FORM.PHONE.FIELD_NAME]: "",
      [MAP_TEXTS.FORM.SUBJECT.FIELD_NAME]: "",
      [MAP_TEXTS.FORM.MESSAGE.FIELD_NAME]: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    toast.success("Message Sent", {
      description: "We'll get back to you as soon as possible",
    });
    console.log("Form submitted:", data);
    form.reset();
  };

  return (
    <div>
      <Hero 
        title={MAP_TEXTS.HERO.TITLE} 
        description={MAP_TEXTS.HERO.DESCRIPTION} 
        imageUrl={bgBlurredHouseUrl} 
      />
      
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section data-testid="contact-form">
            <h2 className="text-2xl font-bold mb-6">{MAP_TEXTS.SEND_US_A_MESSAGE.TITLE}</h2>
            <p className="text-foreground/80 mb-8 text-pretty">
              {MAP_TEXTS.SEND_US_A_MESSAGE.DESCRIPTION}
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name={MAP_TEXTS.FORM.NAME.FIELD_NAME}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{MAP_TEXTS.FORM.NAME.LABEL}</FormLabel>
                      <FormControl>
                        <Input placeholder={MAP_TEXTS.FORM.NAME.PLACEHOLDER} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={MAP_TEXTS.FORM.EMAIL.FIELD_NAME}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{MAP_TEXTS.FORM.EMAIL.LABEL}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={MAP_TEXTS.FORM.EMAIL.PLACEHOLDER} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={MAP_TEXTS.FORM.PHONE.FIELD_NAME}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{MAP_TEXTS.FORM.PHONE.LABEL}</FormLabel>
                        <FormControl>
                          <Input placeholder={MAP_TEXTS.FORM.PHONE.PLACEHOLDER} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{MAP_TEXTS.FORM.SUBJECT.LABEL}</FormLabel>
                      <FormControl>
                        <Input placeholder={MAP_TEXTS.FORM.SUBJECT.PLACEHOLDER} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={MAP_TEXTS.FORM.MESSAGE.FIELD_NAME}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{MAP_TEXTS.FORM.MESSAGE.LABEL}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={MAP_TEXTS.FORM.MESSAGE.PLACEHOLDER} 
                          className="resize-none min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  {MAP_TEXTS.FORM.SUBMIT}
                </Button>
              </form>
            </Form>
          </section>
          
          <section data-testid="contact-office">
            <h2 className="text-2xl font-bold mb-6">{MAP_TEXTS.OUR_OFFICE.TITLE}</h2>
            
            <div className="bg-muted/30 p-6 rounded-lg mb-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-fit">
                    <MapPin className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{MAP_TEXTS.OUR_OFFICE.ADDRESS.TITLE}</h4>
                    {MAP_TEXTS.OUR_OFFICE.ADDRESS.INFO.map((info) => (
                      <p key={info} className="text-foreground/70">{info}</p>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-fit">
                    <Phone className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{MAP_TEXTS.OUR_OFFICE.PHONE.TITLE}</h4>
                    {MAP_TEXTS.OUR_OFFICE.PHONE.INFO.map((info) => (
                      <p key={info} className="text-foreground/70">{info}</p>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-fit">
                    <Mail className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{MAP_TEXTS.OUR_OFFICE.EMAIL.TITLE}</h4>
                    {MAP_TEXTS.OUR_OFFICE.EMAIL.INFO.map((info) => (
                      <p key={info} className="text-foreground/70">{info}</p>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-fit">
                    <Clock className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{MAP_TEXTS.OUR_OFFICE.OPENING_HOURS.TITLE}</h4>
                    {MAP_TEXTS.OUR_OFFICE.OPENING_HOURS.INFO.map((info) => (
                      <p key={info} className="text-foreground/70">{info}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

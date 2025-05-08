
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { addContact } from "@/services/database";
import { Link } from "react-router-dom";

// Form schema with validation
const formSchema = z.object({
  name: z.string().min(2, "השם חייב להכיל לפחות 2 תווים"),
  email: z.string().email("אנא הכנס כתובת אימייל תקינה"),
  phone: z.string().min(9, "אנא הכנס מספר טלפון תקין").max(15, "מספר הטלפון ארוך מדי"),
  message: z.string().min(5, "ההודעה חייבת להכיל לפחות 5 תווים"),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "יש לאשר את מדיניות הפרטיות כדי להמשיך" })
  })
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      privacyConsent: false
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Remove consent field before sending
      const { privacyConsent, ...contactData } = data;
      
      // Submit form data
      addContact(contactData);
      
      // Reset form
      form.reset();
      
      // Show success message
      toast({
        title: "ההודעה נשלחה בהצלחה",
        description: "נחזור אליך בהקדם האפשרי.",
      });
    } catch (error) {
      toast({
        title: "שגיאה בשליחת הטופס",
        description: "אירעה שגיאה בעת שליחת הטופס. אנא נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-right block">שם מלא</FormLabel>
              <FormControl>
                <Input 
                  placeholder="הכנס את שמך המלא" 
                  {...field} 
                  className="text-right"
                  aria-required="true"
                />
              </FormControl>
              <FormMessage className="text-right" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-right block">אימייל</FormLabel>
              <FormControl>
                <Input 
                  placeholder="הכנס את כתובת האימייל שלך" 
                  type="email" 
                  {...field} 
                  className="text-right"
                  aria-required="true"
                />
              </FormControl>
              <FormMessage className="text-right" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-right block">טלפון</FormLabel>
              <FormControl>
                <Input 
                  placeholder="הכנס את מספר הטלפון שלך" 
                  type="tel" 
                  {...field} 
                  className="text-right"
                  aria-required="true"
                />
              </FormControl>
              <FormMessage className="text-right" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-right block">הודעה</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="כתוב את הודעתך כאן" 
                  {...field} 
                  className="text-right min-h-32"
                  aria-required="true"
                />
              </FormControl>
              <FormMessage className="text-right" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="privacyConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rtl:space-x-reverse">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-required="true"
                />
              </FormControl>
              <div className="text-right">
                <FormLabel className="text-sm font-normal cursor-pointer">
                  קראתי ואני מסכים/ה ל<Link to="/privacy" className="text-bstudio-primary hover:underline" target="_blank">מדיניות הפרטיות</Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
  
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loader mr-2"></span>
              שולח...
            </>
          ) : (
            "שלח הודעה"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;

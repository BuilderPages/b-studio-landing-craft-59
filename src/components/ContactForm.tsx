
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { saveContact } from "@/services/database";
import { Link } from "react-router-dom";

// Schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "השם צריך להכיל לפחות 2 תווים" }),
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "ההודעה צריכה להכיל לפחות 10 תווים" }),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: "יש לאשר את מדיניות הפרטיות",
  }),
});

export type ContactFormData = z.infer<typeof formSchema>;

export interface ContactFormProps {
  onSubmit?: (formData: ContactFormData) => Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      privacyConsent: false,
    },
  });

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default submission handling
        saveContact({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        });
      }
      
      toast({
        title: "פנייתך התקבלה בהצלחה",
        description: "נציג שלנו יצור איתך קשר בהקדם האפשרי.",
      });
      
      form.reset();
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-right">יצירת קשר</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel>שם מלא</FormLabel>
                <FormControl>
                  <Input placeholder="הזן את שמך המלא" {...field} className="text-right" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel>דואר אלקטרוני</FormLabel>
                <FormControl>
                  <Input placeholder="הזן את כתובת האימייל שלך" {...field} className="text-right" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel>נושא (אופציונלי)</FormLabel>
                <FormControl>
                  <Input placeholder="הזן את נושא הפנייה" {...field} className="text-right" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="text-right">
                <FormLabel>הודעה</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="כתוב את הודעתך כאן"
                    className="min-h-[120px] text-right"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="privacyConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row-reverse items-start space-x-3 space-x-reverse">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none text-right">
                  <FormLabel>
                    אני מסכים/ה ל<Link to="/privacy" className="text-bstudio-primary hover:underline">מדיניות הפרטיות</Link>
                  </FormLabel>
                  <FormDescription className="text-xs">
                    המידע שתמסור ישמש אותנו ליצירת קשר בלבד ולא יועבר לגורמים שלישיים
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-bstudio-primary hover:bg-bstudio-primary/90" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "שולח..." : "שלח"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;

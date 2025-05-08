
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface ContactFormProps {
  onSubmit: (formData: ContactFormData) => Promise<void>;
}

export interface ContactFormData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date?: string;
  ip?: string;
  device?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        date: new Date().toISOString(),
      });
      
      toast({
        title: "פנייה נשלחה בהצלחה!",
        description: "נחזור אליך בהקדם.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "שגיאה בשליחת הטופס",
        description: "אנא נסו שוב מאוחר יותר.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-gray-700 block text-right">
            שם מלא*
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="text-right"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-gray-700 block text-right">
            דואר אלקטרוני*
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="text-right"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-gray-700 block text-right">
            טלפון*
          </label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="text-right"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-gray-700 block text-right">
            נושא*
          </label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="text-right"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-gray-700 block text-right">
          תוכן ההודעה*
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="min-h-[150px] text-right"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="loader mr-2"></span> שולח...
          </>
        ) : (
          "שליחת הפנייה"
        )}
      </Button>
    </form>
  );
};

export default ContactForm;

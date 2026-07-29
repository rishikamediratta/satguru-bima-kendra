import { useState } from 'react';
import { SEOHead } from '@/components/seo-head';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { businessData } from '@/data/content';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/lib/i18n';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z.string().trim().min(1, "Phone number is required"),
  email: z.string().email("Valid email required").optional().or(z.literal('')),
  message: z.string(),
});

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);
    const message = `New Website Enquiry\n\nName: ${values.name}\nPhone: ${values.phone}\nEmail: ${values.email || 'Not provided'}\nMessage: ${values.message || 'No message'}`;
    const whatsappUrl = `https://wa.me/91${businessData.phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="w-full pb-24">
      <SEOHead 
        title={t('seo.contactTitle')} 
        description={t('seo.contactDesc')} 
      />

      <section className="bg-slate-900 text-white pt-24 pb-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('contact.title')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-2">{t('contact.contactInfo')}</h2>
                <p className="text-muted-foreground">{t('contact.contactInfoDesc')}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t('contact.officeAddress')}</h3>
                    <p className="text-muted-foreground">{businessData.address}</p>
                    <a href={businessData.mapUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-medium text-sm mt-1 inline-block hover:underline">
                      {t('contact.getDirections')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t('contact.phoneWhatsapp')}</h3>
                    <p className="text-muted-foreground">+91 {businessData.phone}</p>
                    <div className="flex gap-4 mt-1">
                      <a href={`tel:+91${businessData.phone}`} className="text-primary font-medium text-sm hover:underline">{t('contact.callNow')}</a>
                      <a href={`https://wa.me/91${businessData.phone}`} target="_blank" rel="noopener noreferrer" className="text-primary font-medium text-sm hover:underline">{t('contact.whatsapp')}</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t('contact.emailAddress')}</h3>
                    <a href={`mailto:${businessData.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {businessData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t('contact.officeHours')}</h3>
                    <p className="text-muted-foreground">{t('contact.hoursEveryday', { hours: businessData.hours })}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 bg-card border rounded-3xl p-8 md:p-10 shadow-sm"
            >
              <h3 className="text-2xl font-bold mb-6">{t('contact.sendMessage')}</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.fullName')} <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder={t('contact.namePlaceholder')} className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.phoneNumber')} <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder={t('contact.phonePlaceholder')} className="h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.emailOptional')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.emailPlaceholder')} type="email" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>{t('contact.yourMessage')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('contact.messagePlaceholder')} 
                            className="min-h-[120px] resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full h-14 text-base font-semibold" disabled={isSubmitting}>
                    {isSubmitting ? t('contact.sendingBtn') : <><Send className="w-5 h-5 mr-2" /> {t('contact.sendBtn')}</>}
                  </Button>
                </form>
              </Form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-3xl overflow-hidden shadow-sm border h-[400px] bg-muted">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14287.545758368597!2d80.30154089999999!3d26.4593816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c47a965706563%3A0xe54e601ef468bfb!2sGovind%20Nagar%2C%20Kanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Satguru Bima Kendra Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

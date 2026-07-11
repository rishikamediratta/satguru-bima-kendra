import { SEOHead } from '@/components/seo-head';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { getServicesData, businessData } from '@/data/content';
import { useLanguage } from '@/lib/i18n';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Services() {
  const { t } = useLanguage();
  const servicesData = getServicesData(t);

  return (
    <div className="w-full pb-24">
      <SEOHead 
        title={t('seo.servicesTitle')} 
        description={t('seo.servicesDesc')} 
      />

      <section className="bg-slate-900 text-white pt-24 pb-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('servicesPage.title')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t('servicesPage.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {servicesData.map((service) => {
              const whatsappMessage = encodeURIComponent(t('whatsapp.enquiryMsg', { service: service.title }));
              const whatsappUrl = `https://wa.me/91${businessData.phone}?text=${whatsappMessage}`;

              return (
                <motion.div 
                  key={service.id}
                  variants={item}
                  className="bg-card border rounded-2xl p-8 flex flex-col hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mb-8 flex-1">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground/70 mb-4">{t('servicesPage.keyBenefits')}</h4>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-foreground/80">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t mt-auto mb-6">
                    <div className="text-sm">
                      <span className="font-semibold">{t('servicesPage.idealFor')} </span>
                      <span className="text-muted-foreground">{service.idealFor}</span>
                    </div>
                  </div>

                  <Button asChild className="w-full h-12 text-base font-semibold group-hover:shadow-md transition-all">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" /> {t('servicesPage.enquireNow')}
                    </a>
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

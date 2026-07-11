import { SEOHead } from '@/components/seo-head';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Vikas Tandon",
      role: t('testimonialsPage.t1Role'),
      quote: t('testimonialsPage.t1Quote'),
    },
    {
      name: "Meera Gupta",
      role: t('testimonialsPage.t2Role'),
      quote: t('testimonialsPage.t2Quote'),
    },
    {
      name: "Rahul Srivastava",
      role: t('testimonialsPage.t3Role'),
      quote: t('testimonialsPage.t3Quote'),
    },
    {
      name: "Prakash Chawla",
      role: t('testimonialsPage.t4Role'),
      quote: t('testimonialsPage.t4Quote'),
    },
    {
      name: "Sneha Mishra",
      role: t('testimonialsPage.t5Role'),
      quote: t('testimonialsPage.t5Quote'),
    },
    {
      name: "Amit Dubey",
      role: t('testimonialsPage.t6Role'),
      quote: t('testimonialsPage.t6Quote'),
    }
  ];

  return (
    <div className="w-full pb-24">
      <SEOHead 
        title={t('seo.testimonialsTitle')} 
        description={t('seo.testimonialsDesc')} 
      />

      <section className="bg-slate-900 text-white pt-24 pb-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('testimonialsPage.title')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t('testimonialsPage.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((tItem, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card border rounded-2xl p-8 relative hover:shadow-lg transition-shadow"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-muted/50" />
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <p className="text-foreground/80 mb-8 italic leading-relaxed min-h-[120px]">
                  "{tItem.quote}"
                </p>
                <div className="flex items-center gap-4 border-t pt-6 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                    {tItem.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{tItem.name}</div>
                    <div className="text-sm text-muted-foreground">{tItem.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12 text-sm text-muted-foreground">
            {t('testimonialsPage.note')}
          </div>
        </div>
      </section>
    </div>
  );
}

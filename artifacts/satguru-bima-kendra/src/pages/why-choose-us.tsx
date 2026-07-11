import { SEOHead } from '@/components/seo-head';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Handshake, Zap, IndianRupee, HeartHandshake } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const reasons = [
    {
      title: t('whyChooseUsPage.r1Title'),
      description: t('whyChooseUsPage.r1Desc'),
      icon: <Award className="w-8 h-8" />
    },
    {
      title: t('whyChooseUsPage.r2Title'),
      description: t('whyChooseUsPage.r2Desc'),
      icon: <ShieldCheck className="w-8 h-8" />
    },
    {
      title: t('whyChooseUsPage.r3Title'),
      description: t('whyChooseUsPage.r3Desc'),
      icon: <Handshake className="w-8 h-8" />
    },
    {
      title: t('whyChooseUsPage.r4Title'),
      description: t('whyChooseUsPage.r4Desc'),
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: t('whyChooseUsPage.r5Title'),
      description: t('whyChooseUsPage.r5Desc'),
      icon: <IndianRupee className="w-8 h-8" />
    },
    {
      title: t('whyChooseUsPage.r6Title'),
      description: t('whyChooseUsPage.r6Desc'),
      icon: <HeartHandshake className="w-8 h-8" />
    }
  ];

  return (
    <div className="w-full pb-24">
      <SEOHead 
        title={t('seo.whyChooseUsTitle')} 
        description={t('seo.whyChooseUsDesc')} 
      />

      <section className="bg-slate-900 text-white pt-24 pb-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('whyChooseUsPage.title')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {t('whyChooseUsPage.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card border rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  {reason.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { SEOHead } from '@/components/seo-head';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Eye, Award } from 'lucide-react';
import { businessData } from '@/data/content';
import { useLanguage } from '@/lib/i18n';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="w-full pb-24">
      <SEOHead 
        title={t('seo.aboutTitle')} 
        description={t('seo.aboutDesc')} 
      />

      {/* Header */}
      <section className="bg-slate-900 text-white pt-24 pb-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {t('about.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            {t('about.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="md:col-span-5 relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/avatar.jpg" 
                  alt="Rishi Mediratta - Founder of Satguru Bima Kendra" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-full blur-3xl z-0" />
              <div className="absolute top-10 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl z-0" />
              
              <div className="absolute bottom-8 -left-8 bg-card border shadow-xl p-4 rounded-xl z-20 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">10+ {t('home.yearsExperience').split(' ')[0]}</div>
                    <div className="text-sm text-muted-foreground font-medium">{t('about.experience')}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="md:col-span-7"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Rishi Mediratta</h2>
              <p className="text-primary font-semibold text-lg mb-8">{t('about.founderRole')}</p>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-10">
                <p>
                  {t('about.p1')}
                </p>
                <p>
                  {t('about.p2')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  t('about.bullet1'),
                  t('about.bullet2'),
                  t('about.bullet3'),
                  t('about.bullet4')
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-card p-10 rounded-3xl border shadow-sm"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('about.missionTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.missionDesc')}
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-card p-10 rounded-3xl border shadow-sm"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('about.visionTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.visionDesc')}
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

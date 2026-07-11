import { SEOHead } from '@/components/seo-head';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle2, Star, Quote } from 'lucide-react';
import { getServicesData, businessData } from '@/data/content';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/lib/i18n';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const { t } = useLanguage();
  const whatsappUrl = `https://wa.me/91${businessData.phone}?text=${encodeURIComponent(t('whatsapp.consultationMsg'))}`;
  const servicesData = getServicesData(t);

  return (
    <div className="w-full overflow-hidden">
      <SEOHead 
        title={t('seo.homeTitle')} 
        description={t('seo.homeDesc')} 
      />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.jpg" 
            alt="Abstract dark financial background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm mb-6 font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t('common.trustedAdvisor')}
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              {t('home.heroTitle1')} <br />
              <span className="text-primary">{t('home.heroTitle2')}</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              {t('home.heroSubtitle')}
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-base font-semibold shadow-lg shadow-primary/20">
                <a href="tel:+919506224269">{t('home.callNow', { phone: '+91 95062 24269' })}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base font-semibold bg-background/50 backdrop-blur-sm">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">{t('home.whatsappUs')}</a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-14 px-8 text-base font-semibold hidden sm:inline-flex hover:bg-transparent">
                <Link href="/contact" className="flex items-center gap-2 group">
                  {t('home.bookConsultation')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PARTNERS STRIP */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">{t('home.trustedPartners')}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {businessData.partners.map(partner => (
              <div key={partner} className="text-xl md:text-2xl font-bold tracking-tight text-foreground/80">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.comprehensiveCoverage')}</h2>
            <p className="text-muted-foreground text-lg">{t('home.tailoredSolutions')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.slice(0, 3).map((service, i) => (
              <motion.div 
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }
                }}
                className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 min-h-[48px]">{service.description}</p>
                <ul className="space-y-2 mb-8">
                  {service.benefits.slice(0, 2).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link href="/services">{t('common.readMore')}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/services" className="flex items-center gap-2">
                {t('common.viewAll')} <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-accent/20 blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('home.whyKanpurTrustsUs')}</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                {t('home.whyDesc')}
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-slate-400 font-medium">{t('home.yearsExperience')}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-slate-400 font-medium">{t('home.familiesProtected')}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-slate-400 font-medium">{t('home.claimSupport')}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-slate-400 font-medium">{t('home.transparent')}</div>
                </div>
              </div>
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                <Link href="/why-choose-us">{t('home.readOurStory')}</Link>
              </Button>
            </div>
            
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 lg:p-10 relative">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-700/50" />
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-accent text-accent" />)}
              </div>
              <p className="text-xl font-medium text-slate-200 mb-8 italic leading-relaxed">
                {t('home.homeTestimonial')}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center font-bold text-lg">{t('home.testimonialName').charAt(0)}</div>
                <div>
                  <div className="font-semibold text-white">{t('home.testimonialName')}</div>
                  <div className="text-sm text-slate-400">{t('home.testimonialRole')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.faqTitle')}</h2>
            <p className="text-muted-foreground text-lg">{t('home.faqDesc')}</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: t('faq.q1'), a: t('faq.a1') },
              { q: t('faq.q2'), a: t('faq.a2') },
              { q: t('faq.q3'), a: t('faq.a3') },
              { q: t('faq.q4'), a: t('faq.a4') },
              { q: t('faq.q5'), a: t('faq.a5') }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl px-6 bg-card data-[state=open]:shadow-md transition-all">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6 text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('home.readyTitle')}</h2>
          <p className="text-primary-foreground/80 text-lg mb-10">{t('home.readyDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-base font-semibold shadow-lg">
              <Link href="/contact">{t('home.getDirections')}</Link>
            </Button>
            <Button asChild size="lg" className="h-14 px-8 text-base font-semibold bg-green-500 hover:bg-green-600 text-white shadow-lg border-none">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                {t('home.chatWhatsapp')}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

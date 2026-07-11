import { Link } from 'wouter';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-200 py-12 md:py-16 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                S
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                {t('common.businessName')}
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/p/Satguru-Bima-Kendra-100092692543529/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://www.instagram.com/satg462bima/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.youtube.com/channel/UCet5_VLI1nALyMeYECruyOw/about" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: t('nav.home') },
                { href: '/about', label: t('footer.aboutRishi') },
                { href: '/services', label: t('footer.insuranceServices') },
                { href: '/why-choose-us', label: t('nav.whyChooseUs') },
                { href: '/testimonials', label: t('footer.clientTestimonials') },
                { href: '/contact', label: t('footer.contactUs') },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{t('footer.topServices')}</h3>
            <ul className="space-y-3">
              {[t('services.life.title'), t('services.health.title'), t('services.term.title'), t('services.car.title'), t('services.retirement.title')].map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">{t('footer.contactInfo')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Satguru Bima Kendra, 11 Block, Govind Nagar, Kanpur, UP</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919506224269" className="hover:text-white transition-colors">+91 95062 24269</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:rishimehndiratta999@gmail.com" className="hover:text-white transition-colors">rishimehndiratta999@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span>{t('contact.hoursEveryday', { hours: '11:00 AM - 8:00 PM' })}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            {t('footer.rights', { year: new Date().getFullYear().toString() })}
          </p>
          <p className="text-sm text-slate-500">
            {t('footer.trustedSince', { year: (new Date().getFullYear() - 10).toString() })}
          </p>
        </div>
      </div>
    </footer>
  );
}

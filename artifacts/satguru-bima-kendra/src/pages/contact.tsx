import { useEffect, useRef, useState } from 'react';
import { SEOHead } from '@/components/seo-head';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Plus, Send, Trash2 } from 'lucide-react';
import { businessData } from '@/data/content';
import { useLanguage } from '@/lib/i18n';
import { AnimatePresence } from 'framer-motion';

type MemberType = 'adult' | 'child';

type FamilyMember = {
  id: string;
  type: MemberType;
  name: string;
  age: string;
};

type MemberErrors = Record<string, { name?: string; age?: string }>;

function FamilyMemberCard({
  member,
  number,
  error,
  onChange,
  onRemove,
  onBlur,
  nameInputRef,
}: {
  member: FamilyMember;
  number: number;
  error?: { name?: string; age?: string };
  onChange: (field: 'name' | 'age', value: string) => void;
  onRemove: () => void;
  onBlur: (field: 'name' | 'age') => void;
  nameInputRef: (node: HTMLInputElement | null) => void;
}) {
  const isAdult = member.type === 'adult';
  const label = isAdult ? 'Adult' : 'Child';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0, y: -8 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{ opacity: 0, height: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div className="rounded-2xl border bg-muted/30 p-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h4 className="font-semibold text-foreground">{label} {number}</h4>
          <Button type="button" variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={onRemove}>
            <Trash2 className="w-4 h-4 mr-1" /> Remove {label}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name <span className="text-destructive">*</span></label>
            <Input
              ref={nameInputRef}
              value={member.name}
              onChange={(event) => onChange('name', event.target.value)}
              onBlur={() => onBlur('name')}
              className="h-11"
            />
            {error?.name && <p className="text-sm font-medium text-destructive">{error.name}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Age <span className="text-destructive">*</span></label>
            <Input
              type="number"
              min={isAdult ? 18 : 0}
              value={member.age}
              onChange={(event) => onChange('age', event.target.value)}
              onBlur={() => onBlur('age')}
              className="h-11"
            />
            {error?.age && <p className="text-sm font-medium text-destructive">{error.age}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [pendingFocusId, setPendingFocusId] = useState<string | null>(null);
  const memberNameRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const adults = members.filter((member) => member.type === 'adult');
  const children = members.filter((member) => member.type === 'child');

  const basicErrors = {
    name: name.trim() ? undefined : 'Name is required.',
    phone: phone.trim().length >= 10 ? undefined : 'Enter a valid phone number.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? undefined : 'Enter a valid email address.',
  };
  const memberErrors: MemberErrors = {};
  members.forEach((member) => {
    const errors: { name?: string; age?: string } = {};
    if (!member.name.trim()) errors.name = 'Name is required.';
    if (!member.age.trim()) {
      errors.age = 'Age is required.';
    } else if (!Number.isFinite(Number(member.age))) {
      errors.age = 'Enter a valid age.';
    } else if (member.type === 'adult' && Number(member.age) < 18) {
      errors.age = 'Adult age must be 18 or above.';
    } else if (member.type === 'child' && Number(member.age) >= 25) {
      errors.age = 'Child age must be below 25.';
    }
    if (errors.name || errors.age) memberErrors[member.id] = errors;
  });
  const hasValidationErrors = Boolean(basicErrors.name || basicErrors.phone || basicErrors.email || Object.keys(memberErrors).length);

  useEffect(() => {
    if (!pendingFocusId) return;
    requestAnimationFrame(() => memberNameRefs.current[pendingFocusId]?.focus());
    setPendingFocusId(null);
  }, [members, pendingFocusId]);

  const shouldShowError = (key: string) => showAllErrors || touched[key];
  const addMember = (type: MemberType) => {
    const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setMembers((current) => [...current, { id, type, name: '', age: '' }]);
    setPendingFocusId(id);
  };
  const updateMember = (id: string, field: 'name' | 'age', value: string) => {
    setMembers((current) => current.map((member) => member.id === id ? { ...member, [field]: value } : member));
  };
  const removeMember = (id: string) => setMembers((current) => current.filter((member) => member.id !== id));
  const markTouched = (key: string) => setTouched((current) => ({ ...current, [key]: true }));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasValidationErrors) {
      setShowAllErrors(true);
      return;
    }
    setIsSubmitting(true);
    const adultDetails = adults.length
      ? adults.map((adult, index) => `Adult ${index + 1}\nName:\n${adult.name}\nAge:\n${adult.age}`).join('\n\n')
      : 'None';
    const childDetails = children.length
      ? children.map((child, index) => `Child ${index + 1}\nName:\n${child.name}\nAge:\n${child.age}`).join('\n\n')
      : 'None';
    const whatsappMessage = `📋 New Insurance Enquiry\n\n👤 Customer Details\n\nName:\n${name}\n\nPhone:\n${phone}\n\nEmail:\n${email}\n\n👨 Adults: ${adults.length}\n\n${adultDetails}\n\n👶 Children: ${children.length}\n\n${childDetails}\n\n📝 Additional Information\n\n${message || 'None'}`;
    const whatsappUrl = `https://wa.me/91${businessData.phone}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setMembers([]);
    setTouched({});
    setShowAllErrors(false);
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
                <form onSubmit={onSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t('contact.fullName')} <span className="text-destructive">*</span></label>
                      <Input value={name} onChange={(event) => setName(event.target.value)} onBlur={() => markTouched('name')} placeholder={t('contact.namePlaceholder')} className="h-12" />
                      {shouldShowError('name') && basicErrors.name && <p className="text-sm font-medium text-destructive">{basicErrors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t('contact.phoneNumber')} <span className="text-destructive">*</span></label>
                      <Input value={phone} onChange={(event) => setPhone(event.target.value)} onBlur={() => markTouched('phone')} placeholder={t('contact.phonePlaceholder')} className="h-12" />
                      {shouldShowError('phone') && basicErrors.phone && <p className="text-sm font-medium text-destructive">{basicErrors.phone}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address <span className="text-destructive">*</span></label>
                    <Input value={email} onChange={(event) => setEmail(event.target.value)} onBlur={() => markTouched('email')} placeholder={t('contact.emailPlaceholder')} type="email" className="h-12" />
                    {shouldShowError('email') && basicErrors.email && <p className="text-sm font-medium text-destructive">{basicErrors.email}</p>}
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex gap-3 text-sm font-medium text-muted-foreground mb-1">
                          <span>Adults: {adults.length}</span>
                          <span>Children: {children.length}</span>
                        </div>
                        <h4 className="text-lg font-semibold">Family Members</h4>
                      </div>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => addMember('adult')}><Plus className="w-4 h-4 mr-1" /> Add Adult</Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => addMember('child')}><Plus className="w-4 h-4 mr-1" /> Add Child</Button>
                      </div>
                    </div>
                    {!members.length && <p className="text-sm text-muted-foreground">No family members added.</p>}
                    <div className="space-y-4">
                      <AnimatePresence initial={false}>
                        {adults.map((member, index) => (
                          <FamilyMemberCard
                            key={member.id}
                            member={member}
                            number={index + 1}
                            error={shouldShowError(`member-${member.id}-name`) || shouldShowError(`member-${member.id}-age`) ? memberErrors[member.id] : undefined}
                            onChange={(field, value) => updateMember(member.id, field, value)}
                            onBlur={(field) => markTouched(`member-${member.id}-${field}`)}
                            onRemove={() => removeMember(member.id)}
                            nameInputRef={(node) => { memberNameRefs.current[member.id] = node; }}
                          />
                        ))}
                        {children.map((member, index) => (
                          <FamilyMemberCard
                            key={member.id}
                            member={member}
                            number={index + 1}
                            error={shouldShowError(`member-${member.id}-name`) || shouldShowError(`member-${member.id}-age`) ? memberErrors[member.id] : undefined}
                            onChange={(field, value) => updateMember(member.id, field, value)}
                            onBlur={(field) => markTouched(`member-${member.id}-${field}`)}
                            onRemove={() => removeMember(member.id)}
                            nameInputRef={(node) => { memberNameRefs.current[member.id] = node; }}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Additional Information (Optional)</label>
                    <Textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder={t('contact.messagePlaceholder')} className="min-h-[120px] resize-none" />
                  </div>

                  <Button type="submit" size="lg" className="w-full h-14 text-base font-semibold" disabled={isSubmitting || hasValidationErrors}>
                    {isSubmitting ? t('contact.sendingBtn') : <><Send className="w-5 h-5 mr-2" /> {t('contact.sendBtn')}</>}
                  </Button>
                </form>
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

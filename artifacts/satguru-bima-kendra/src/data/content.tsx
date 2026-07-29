import { Shield, ShieldAlert, HeartPulse, Baby, PiggyBank, TrendingUp, Car, Bike, Plane, Building2, CalendarHeart } from 'lucide-react';
import { ReactNode } from 'react';

export const getServicesData = (t: (key: string) => string) => [
  {
    id: "life-insurance",
    title: t("services.life.title"),
    icon: <Shield className="w-8 h-8" />,
    description: t("services.life.desc"),
    benefits: [
      t("services.life.benefits.0"),
      t("services.life.benefits.1"),
      t("services.life.benefits.2"),
      t("services.life.benefits.3")
    ],
    idealFor: t("services.life.idealFor"),
  },
  {
    id: "health-insurance",
    title: t("services.health.title"),
    icon: <HeartPulse className="w-8 h-8" />,
    description: t("services.health.desc"),
    benefits: [
      t("services.health.benefits.0"),
      t("services.health.benefits.1"),
      t("services.health.benefits.2"),
      t("services.health.benefits.3")
    ],
    idealFor: t("services.health.idealFor"),
  },
  {
    id: "term-insurance",
    title: t("services.term.title"),
    icon: <ShieldAlert className="w-8 h-8" />,
    description: t("services.term.desc"),
    benefits: [
      t("services.term.benefits.0"),
      t("services.term.benefits.1"),
      t("services.term.benefits.2"),
      t("services.term.benefits.3")
    ],
    idealFor: t("services.term.idealFor"),
  },
  {
    id: "child-plans",
    title: t("services.child.title"),
    icon: <Baby className="w-8 h-8" />,
    description: t("services.child.desc"),
    benefits: [
      t("services.child.benefits.0"),
      t("services.child.benefits.1"),
      t("services.child.benefits.2"),
      t("services.child.benefits.3")
    ],
    idealFor: t("services.child.idealFor"),
  },
  {
    id: "retirement-plans",
    title: t("services.retirement.title"),
    icon: <PiggyBank className="w-8 h-8" />,
    description: t("services.retirement.desc"),
    benefits: [
      t("services.retirement.benefits.0"),
      t("services.retirement.benefits.1"),
      t("services.retirement.benefits.2"),
      t("services.retirement.benefits.3")
    ],
    idealFor: t("services.retirement.idealFor"),
  },
  {
    id: "investment-plans",
    title: t("services.investment.title"),
    icon: <TrendingUp className="w-8 h-8" />,
    description: t("services.investment.desc"),
    benefits: [
      t("services.investment.benefits.0"),
      t("services.investment.benefits.1"),
      t("services.investment.benefits.2"),
      t("services.investment.benefits.3")
    ],
    idealFor: t("services.investment.idealFor"),
  },
  {
    id: "car-insurance",
    title: t("services.car.title"),
    icon: <Car className="w-8 h-8" />,
    description: t("services.car.desc"),
    benefits: [
      t("services.car.benefits.0"),
      t("services.car.benefits.1"),
      t("services.car.benefits.2"),
      t("services.car.benefits.3")
    ],
    idealFor: t("services.car.idealFor"),
  },
  {
    id: "bike-insurance",
    title: t("services.bike.title"),
    icon: <Bike className="w-8 h-8" />,
    description: t("services.bike.desc"),
    benefits: [
      t("services.bike.benefits.0"),
      t("services.bike.benefits.1"),
      t("services.bike.benefits.2"),
      t("services.bike.benefits.3")
    ],
    idealFor: t("services.bike.idealFor"),
  },
  {
    id: "travel-insurance",
    title: t("services.travel.title"),
    icon: <Plane className="w-8 h-8" />,
    description: t("services.travel.desc"),
    benefits: [
      t("services.travel.benefits.0"),
      t("services.travel.benefits.1"),
      t("services.travel.benefits.2"),
      t("services.travel.benefits.3")
    ],
    idealFor: t("services.travel.idealFor"),
  },
  {
    id: "property-insurance",
    title: t("services.property.title"),
    icon: <Building2 className="w-8 h-8" />,
    description: t("services.property.desc"),
    benefits: [
      t("services.property.benefits.0"),
      t("services.property.benefits.1"),
      t("services.property.benefits.2"),
      t("services.property.benefits.3")
    ],
    idealFor: t("services.property.idealFor"),
  },
  {
    id: "event-insurance",
    title: t("services.event.title"),
    icon: <CalendarHeart className="w-8 h-8" />,
    description: t("services.event.desc"),
    benefits: [
      t("services.event.benefits.0"),
      t("services.event.benefits.1"),
      t("services.event.benefits.2"),
      t("services.event.benefits.3")
    ],
    idealFor: t("services.event.idealFor"),
}
];

export const businessData = {
  name: "Satguru Bima Kendra",
  owner: "Rishi Mediratta",
  experience: "10+ Years",
  address: "11 Block, Govind Nagar, Kanpur",
  phone: "9506224269",
  email: "rishimehndiratta999@gmail.com",
  hours: "11 AM - 8 PM",
  mapUrl: "https://maps.app.goo.gl/BxdNQSYTnJcPqjM37",
  partners: ["Tata AIG", "Tata AIA", "Niva Bupa", "ICICI Lombard"],
  social: {
    facebook: "https://www.facebook.com/p/Satguru-Bima-Kendra-100092692543529/",
    instagram: "https://www.instagram.com/satg462bima/",
    youtube: "https://www.youtube.com/channel/UCet5_VLI1nALyMeYECruyOw/about"
  }
};


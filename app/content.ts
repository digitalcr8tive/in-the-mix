import { BriefcaseBusiness, Heart, PartyPopper, Star } from "lucide-react";

export const services = [
  {
    icon: Heart,
    title: "Weddings",
    text: "A polished bar experience for ceremonies, receptions, and welcome parties."
  },
  {
    icon: PartyPopper,
    title: "Private Parties",
    text: "Birthdays, anniversaries, holiday gatherings, and backyard celebrations."
  },
  {
    icon: BriefcaseBusiness,
    title: "Corporate Events",
    text: "Professional service for mixers, launches, staff events, and client nights."
  },
  {
    icon: Star,
    title: "Special Occasions",
    text: "Custom drink service for moments that deserve a memorable bar."
  }
];

export const eventDetails = [
  {
    src: "/images/instagram/exact-posts/25cf9b64b908ae9f.jpg",
    alt: "Custom wedding bar menu displayed on a marble counter",
    label: "Signature cocktails"
  },
  {
    src: "/images/instagram/brand-cards.jpg",
    alt: "In The Mix Bartending cards arranged over pink flowers",
    label: "Booking ready"
  },
  {
    src: "/images/instagram/birthday-party.jpg",
    alt: "Guests holding drinks at a birthday event",
    label: "Private parties"
  }
];

export const servicePackages = [
  {
    name: "Just The Bartender",
    price: "Starting at $400",
    includes: [
      "Licensed bartender(s)",
      "Portable bar",
      "Bar tools",
      "Setup and cleanup",
      "Shopping list",
      "Fruit garnishes",
      "Personalized drink accessories"
    ],
    clientProvides: ["Alcohol", "Mixers", "Ice", "Cups", "Napkins", "Straws"]
  },
  {
    name: "Mix & Serve",
    price: "Starting at $695",
    includes: [
      "Licensed bartender(s)",
      "Portable bar",
      "Bar tools",
      "Setup and cleanup",
      "Shopping list",
      "Fruit garnishes",
      "Personalized drink accessories",
      "Mixers",
      "Ice",
      "Cups",
      "Napkins",
      "Straws"
    ],
    clientProvides: ["Alcohol"]
  }
];

export const serviceNotes = [
  "Alcohol is provided by the client.",
  "A $100 non-refundable deposit secures booking and is applied to the final balance.",
  "Remaining balance is due 14 days before the event.",
  "Service packages require a 3-hour minimum.",
  "Additional hour: 1 bartender $100/hr, 2 bartenders $175/hr, 3 bartenders $250/hr.",
  "Additional bartender: $175.",
  "Travel fee applies outside Little Rock city limits, starting at $50."
];

import Image from "next/image";
import Link from "next/link";
import { GlassWater, Martini, Sparkles, UsersRound } from "lucide-react";
import { eventDetails, serviceNotes, servicePackages, services } from "../content";
import { BookingForm } from "./BookingForm";

export function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <h1>
          Crafted Cocktails.
          <span>Lasting Memories.</span>
        </h1>
        <p className="hero-lede">
          Mobile bartending services curated for your event.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/contact">
            Check availability
          </Link>
        </div>
      </div>
      <div className="hero-media" aria-label="In The Mix event bar">
        <Image
          src="/images/instagram/exact-posts/8ca546e9c1d52873.jpg"
          alt="In The Mix bartenders standing behind a white event bar"
          fill
          priority
          sizes="(max-width: 900px) 90vw, 46vw"
        />
        <div className="media-badge">
          <Martini aria-hidden="true" size={20} />
          Professional service. Personal touch.
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="section-heading">
        <p>Services</p>
        <h2 id="services-title">For every gathering worth raising a glass.</h2>
      </div>
      <div className="service-grid">
        {services.map(({ icon: Icon, title, text }) => (
          <article className="service" key={title}>
            <Icon aria-hidden="true" size={34} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="package-menu" aria-labelledby="packages-title">
        <div className="package-heading">
          <p className="mini-label">Packages</p>
          <h2 id="packages-title">
            <span>Choose the bar that supports</span>
            <span>your event&apos;s needs.</span>
          </h2>
        </div>
        <div className="package-grid">
          {servicePackages.map((item) => (
            <article className="package-card" key={item.name}>
              <div className="package-card-header">
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </div>
              <div>
                <h4>This package includes</h4>
                <ul>
                  {item.includes.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Client provides</h4>
                <ul>
                  {item.clientProvides.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <ul className="package-notes" aria-label="Service package notes">
          {serviceNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="about-image">
        <Image
          src="/images/instagram/exact-posts/476c948abc535f94.jpg"
          alt="In The Mix bartenders serving a guest at a white event bar"
          fill
          sizes="(max-width: 900px) 90vw, 48vw"
        />
      </div>
      <div className="about-copy">
        <div className="about-title">
          <Sparkles aria-hidden="true" size={30} />
          <h2>
            <span>Personal service,</span>
            <span>polished presentation.</span>
          </h2>
        </div>
        <p>
          In The Mix handles the pour, the pace, and the presentation so hosts
          can stay with their guests. From custom cocktail menus to clean bar
          setup, the service is built around your event plan.
        </p>
        <div className="feature-row">
          <span>
            <GlassWater aria-hidden="true" size={22} />
            Premium ingredients
          </span>
          <span>
            <UsersRound aria-hidden="true" size={22} />
            Guest-focused service
          </span>
        </div>
      </div>
    </section>
  );
}

export function EventDetailsSection() {
  return (
    <section className="event-details" id="event-details" aria-labelledby="event-details-title">
      <div className="section-heading">
        <p>What We Do</p>
        <h2 id="event-details-title">Bringing the bar experience to you.</h2>
      </div>
      <div className="event-details-grid">
        {eventDetails.map((item) => (
          <figure key={item.label}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 900px) 90vw, 30vw"
            />
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function BookingSection() {
  return (
    <section className="booking" id="booking">
      <div className="booking-copy">
        <p className="mini-label">Book now</p>
        <h2>Tell us what you're planning.</h2>
        <p>
          Share the date, location, guest count, and the kind of bar experience
          you have in mind. The message is sent directly to the In The Mix team.
        </p>
        <div className="contact-links">
          <a href="https://www.instagram.com/inthemix.lr/">Instagram</a>
          <a href="https://www.facebook.com/InTheMixLR/">Facebook</a>
        </div>
      </div>
      <BookingForm />
    </section>
  );
}

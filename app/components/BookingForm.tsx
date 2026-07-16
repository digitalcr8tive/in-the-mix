"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const bookingEndpoint =
  process.env.NEXT_PUBLIC_BOOKING_ENDPOINT ||
  (process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "" : "/api/bookings");

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const serviceNeeds = formData.getAll("serviceNeeds").map(String);

    if (serviceNeeds.length === 0) {
      setStatus("error");
      setMessage("Please choose what you need In The Mix to provide.");
      return;
    }

    if (!bookingEndpoint) {
      setStatus("error");
      setMessage(
        "Online booking is being connected. Please contact In The Mix directly in the meantime."
      );
      return;
    }

    const payload = {
      ...Object.fromEntries(formData.entries()),
      serviceNeeds
    };

    try {
      const response = await fetch(bookingEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your request.");
      }

      setStatus("sent");
      setMessage("Your event request was sent. In The Mix will follow up soon.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form className="booking-form" onSubmit={submitBooking}>
      <div className="form-grid">
        <fieldset className="form-section form-span">
          <legend>Full Name*</legend>
          <div className="form-grid form-grid-compact">
            <label>
              First Name
              <input name="firstName" autoComplete="given-name" required />
            </label>
            <label>
              Last Name
              <input name="lastName" autoComplete="family-name" required />
            </label>
          </div>
        </fieldset>
        <label>
          Phone Number*
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(000) 000-0000"
            required
          />
        </label>
        <label>
          E-mail*
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="example@example.com"
            required
          />
        </label>
        <label>
          Date of Event*
          <input name="eventDate" type="date" required />
        </label>
        <label>
          Type of Event*
          <select name="eventType" required defaultValue="">
            <option value="" disabled>
              Please Select
            </option>
            <option>Wedding</option>
            <option>Birthday</option>
            <option>Graduation</option>
            <option>Anniversary</option>
            <option>Other</option>
          </select>
        </label>
        <fieldset className="form-section form-span">
          <legend>Address of Event</legend>
          <div className="form-grid">
            <label className="form-span">
              Street Address
              <input name="streetAddress" autoComplete="address-line1" />
            </label>
            <label className="form-span">
              Street Address Line 2
              <input name="streetAddress2" autoComplete="address-line2" />
            </label>
            <label>
              City
              <input name="city" autoComplete="address-level2" />
            </label>
            <label>
              State / Province
              <input name="state" autoComplete="address-level1" />
            </label>
            <label>
              Postal / Zip Code
              <input name="postalCode" autoComplete="postal-code" />
            </label>
          </div>
        </fieldset>
        <label>
          What is your budget?*
          <input name="budget" type="number" min="0" inputMode="numeric" placeholder="e.g., 1200" required />
        </label>
        <label>
          Expected guest count?*
          <input name="guestCount" type="number" min="1" inputMode="numeric" placeholder="e.g., 75" required />
        </label>
        <label className="form-span duration-field">
          Duration of event (3 hour minimum)*
          <input name="duration" type="number" min="3" inputMode="numeric" placeholder="e.g., 4" required />
        </label>
      </div>
      <fieldset className="form-section">
        <legend>Does the venue include a bar, or will we need to provide our mobile bar?</legend>
        <div className="choice-stack">
          <label className="choice">
            <input name="barSetup" type="radio" value="Venue has bar" />
            Venue has bar
          </label>
          <label className="choice">
            <input name="barSetup" type="radio" value="Mobile bar will need to be provided" />
            Mobile bar will need to be provided
          </label>
        </div>
      </fieldset>
      <fieldset className="form-section">
        <legend>Will you need In The Mix to provide anything? (Please note that we do not provide alcohol)*</legend>
        <div className="choice-stack">
          <label className="choice">
            <input
              name="serviceNeeds"
              type="checkbox"
              value="I would like bar services ONLY (nothing provided)"
            />
            I would like bar services ONLY (nothing provided)
          </label>
          <label className="choice">
            <input
              name="serviceNeeds"
              type="checkbox"
              value="I would like bar services + paper/plastic products + juices/mixers + fruit garnishes"
            />
            I would like bar services + paper/plastic products + juices/mixers + fruit garnishes
          </label>
        </div>
      </fieldset>
      <label>
        Additional Information/Comments
        <textarea
          name="details"
          rows={5}
          placeholder="Share cocktail ideas, timing, venue notes, or anything else we should know."
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button className="button button-primary form-button" type="submit" disabled={status === "sending"}>
        <Send aria-hidden="true" size={18} />
        {status === "sending" ? "Sending request" : "Contact us"}
      </button>
      {message ? (
        <p className={`form-status ${status === "error" ? "is-error" : ""}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}

type BookingRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  eventType?: string;
  streetAddress?: string;
  streetAddress2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  duration?: string;
  barSetup?: string;
  serviceNeeds?: string[];
  guestCount?: string;
  budget?: string;
  details?: string;
  website?: string;
};

type Env = {
  ALLOWED_ORIGIN: string;
  BOOKINGS_TO_EMAIL: string;
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
};

const requiredFields: Array<keyof BookingRequest> = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "eventDate",
  "eventType",
  "budget",
  "guestCount",
  "duration"
];

const corsHeaders = (origin: string | null, env: Env) => ({
  "Access-Control-Allow-Origin": origin === env.ALLOWED_ORIGIN ? origin : env.ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  Vary: "Origin"
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const headers = corsHeaders(origin, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    if (request.method !== "POST" || origin !== env.ALLOWED_ORIGIN) {
      return json({ message: "Request not allowed." }, 403, headers);
    }

    let body: BookingRequest;
    try {
      body = (await request.json()) as BookingRequest;
    } catch {
      return json({ message: "Invalid booking request." }, 400, headers);
    }

    if (body.website) {
      return json({ message: "Booking request sent." }, 200, headers);
    }

    const missing = requiredFields.filter((field) => !body[field]);
    if (missing.length > 0 || !Array.isArray(body.serviceNeeds) || body.serviceNeeds.length === 0) {
      return json({ message: "Please complete the required fields before sending." }, 400, headers);
    }

    const fullName = [body.firstName, body.lastName].filter(Boolean).join(" ");
    const address = [
      body.streetAddress,
      body.streetAddress2,
      body.city,
      body.state,
      body.postalCode
    ]
      .filter(Boolean)
      .join(", ");
    const rows = [
      ["Full name", fullName],
      ["Email", body.email || ""],
      ["Phone", body.phone || ""],
      ["Event date", body.eventDate || ""],
      ["Event type", body.eventType || ""],
      ["Budget", body.budget || ""],
      ["Expected guest count", body.guestCount || ""],
      ["Duration", `${body.duration || ""} hour(s)`],
      ["Address of event", address || "Not provided"],
      ["Venue/mobile bar", body.barSetup || "Not provided"],
      ["Service needs", body.serviceNeeds.join(", ")],
      ["Additional information/comments", body.details || "Not provided"]
    ];

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [env.BOOKINGS_TO_EMAIL],
        reply_to: body.email,
        subject: `New In The Mix consultation request from ${fullName}`,
        html: emailHtml(rows),
        text: rows.map(([label, value]) => `${label}: ${value}`).join("\n")
      })
    });

    if (!resendResponse.ok) {
      console.error("Resend error", await resendResponse.text());
      return json({ message: "Unable to send your request. Please try again." }, 502, headers);
    }

    return json({ message: "Booking request sent." }, 200, headers);
  }
};

function json(payload: { message: string }, status: number, headers: Record<string, string>) {
  return Response.json(payload, { status, headers });
}

function emailHtml(rows: string[][]) {
  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="border-bottom: 1px solid #ddd; padding: 8px 24px 8px 0;">${escapeHtml(label)}</th>
          <td style="border-bottom: 1px solid #ddd; padding: 8px 0;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `<div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
    <h1 style="font-size: 24px;">New In The Mix booking request</h1>
    <table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">${tableRows}</table>
  </div>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

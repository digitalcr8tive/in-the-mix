import { NextResponse } from "next/server";
import { Resend } from "resend";

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

export async function POST(request: Request) {
  const body = (await request.json()) as BookingRequest;
  const missing = requiredFields.filter((field) => !body[field]);
  const missingServiceNeeds =
    !Array.isArray(body.serviceNeeds) || body.serviceNeeds.length === 0;

  if (missing.length > 0 || missingServiceNeeds) {
    return NextResponse.json(
      { message: "Please complete the required fields before sending." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.IN_THE_MIX_TO_EMAIL;
  const from = process.env.IN_THE_MIX_FROM_EMAIL || "In The Mix <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        message:
          "Booking email is not configured yet. Add RESEND_API_KEY and IN_THE_MIX_TO_EMAIL."
      },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
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
  const subject = `New In The Mix consultation request from ${fullName || "Website"}`;
  const rows = [
    ["Full name", fullName],
    ["Email", body.email],
    ["Phone", body.phone],
    ["Event date", body.eventDate],
    ["Event type", body.eventType],
    ["Budget", body.budget || "Not provided"],
    ["Expected guest count", body.guestCount || "Not provided"],
    ["Duration", body.duration ? `${body.duration} hour(s)` : "Not provided"],
    ["Address of event", address || "Not provided"],
    ["Venue/mobile bar", body.barSetup || "Not provided"],
    [
      "Service needs",
      Array.isArray(body.serviceNeeds) && body.serviceNeeds.length > 0
        ? body.serviceNeeds.join(", ")
        : "Not provided"
    ],
    ["Additional information/comments", body.details || "Not provided"]
  ];

  await resend.emails.send({
    from,
    to,
    replyTo: body.email,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
        <h1 style="font-size: 24px;">New booking request</h1>
        <table cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th align="left" style="border-bottom: 1px solid #ddd; padding-right: 24px;">${escapeHtml(label || "")}</th>
                  <td style="border-bottom: 1px solid #ddd;">${escapeHtml(value || "")}</td>
                </tr>
              `
            )
            .join("")}
        </table>
      </div>
    `,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n")
  });

  return NextResponse.json({ message: "Booking request sent." });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

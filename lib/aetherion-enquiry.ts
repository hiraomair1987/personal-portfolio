export type Enquiry = {
  name: string;
  email: string;
  partySize: string;
  destination: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export function validateEnquiry(e: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (e.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.email.trim())) errors.email = "Please enter a valid email address.";
  if (!e.partySize) errors.partySize = "Please choose how many will travel.";
  if (!e.destination) errors.destination = "Please choose a destination.";
  if (e.message.length > 1000) errors.message = "Please keep your message under 1,000 characters.";
  return errors;
}

/**
 * Demo only: nothing is sent anywhere. To go live, replace the body with a
 * request to your backend or form service, e.g.
 *
 *   const res = await fetch("/api/enquiries", { method: "POST", body: JSON.stringify(enquiry) });
 *   if (!res.ok) throw new Error("Enquiry failed");
 *
 * Throwing shows the form's error state; resolving shows the success state.
 */
export async function submitEnquiry(enquiry: Enquiry): Promise<{ demo: boolean }> {
  void enquiry;
  await new Promise((r) => setTimeout(r, 900));
  return { demo: true };
}

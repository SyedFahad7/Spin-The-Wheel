declare const process: { env?: Record<string, string | undefined> } | undefined;

const AIRTABLE_API_KEY = process?.env?.NEXT_PUBLIC_AIRTABLE_KEY;
const AIRTABLE_BASE_ID = process?.env?.NEXT_PUBLIC_AIRTABLE_BASE;
const AIRTABLE_TABLE = process?.env?.NEXT_PUBLIC_AIRTABLE_TABLE ?? "Leads";

const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
  AIRTABLE_TABLE
)}`;

export type LeadRecord = {
  id: string;
  fields: {
    Name?: string;
    Email?: string;
    Company?: string;
    Prize?: string;
  };
};

type AirtableCreateResponse = {
  id: string;
};

export async function createLead(input: {
  name: string;
  email: string;
  company: string;
}): Promise<string> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error("Airtable environment variables are not configured.");
  }

  const res = await fetch(AIRTABLE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fields: {
        Name: input.name,
        Email: input.email,
        Company: input.company
      }
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create lead: ${res.status} ${text}`);
  }

  const data = (await res.json()) as AirtableCreateResponse;
  return data.id;
}

export async function updateLeadPrize(recordId: string, prize: string) {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error("Airtable environment variables are not configured.");
  }

  const url = `${AIRTABLE_URL}/${recordId}`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fields: {
        Prize: prize
      }
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update prize: ${res.status} ${text}`);
  }
}

export async function checkEmailExists(email: string): Promise<boolean> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    throw new Error("Airtable environment variables are not configured.");
  }

  // Query Airtable for records with matching email
  const filterFormula = encodeURIComponent(`{Email} = "${email}"`);
  const url = `${AIRTABLE_URL}?filterByFormula=${filterFormula}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to check email: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { records: LeadRecord[] };
  // Check if any record with this email already has a prize (already spun)
  return data.records.some((record) => !!record.fields.Prize);
}



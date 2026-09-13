// Central place for store contact info + admin access.
// Change anything here and it updates everywhere on the site (Footer, Contact,
// WhatsApp button, Checkout messages, etc).

export const WHATSAPP_NUMBER_INTL = "923113823800"; // no + or spaces, used for wa.me links
export const WHATSAPP_NUMBER_DISPLAY = "+92 311 3823800";

export const CONTACT_EMAIL = "hibbatradingcompany@gmail.com";

export const INSTAGRAM_URL =
  "https://www.instagram.com/hibbatradingcompany?stkn=MW1lM3Q1ZGViZjlrbA==";
export const INSTAGRAM_HANDLE = "@hibbatradingcompany";

export const STORE_ADDRESS =
  "Muhalla Ghulam Muhammad Town, Street No. 04, Post Office Climax Abad, 52250, Gujranwala, Pakistan";

export const waLink = (text = "") =>
  `https://wa.me/${WHATSAPP_NUMBER_INTL}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

// Any account signed up / signed in with this email is treated as the store admin
// and gets access to /admin. Sign up from the normal /auth page using this email.
export const ADMIN_EMAIL = "hibbatradingcompany@gmail.com";

export function isAdminUser(user) {
  return !!user && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

import { MessageCircle } from "lucide-react";
import { waLink } from "@/data/siteConfig";

export function WhatsAppButton() {
  return (
    <a
      href={waLink("Hi Hibba Trading, I have a question")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 animate-pulse-soft place-items-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-110 hover:animate-none"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

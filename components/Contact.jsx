import { contact } from "@/lib/site-data";
import { WhatsappIcon, MailIcon, MapPinIcon, InstagramIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";

const items = [
  {
    icon: WhatsappIcon,
    label: "WhatsApp / Teléfono",
    value: contact.phone,
    href: contact.whatsappUrl,
  },
  {
    icon: MailIcon,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: MapPinIcon,
    label: "Ubicación",
    value: contact.location,
    href: undefined,
  },
];

export default function Contact() {
  return (
    <section id="contacto" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sage-dark">Hablemos</p>
          <h2 className="font-serif text-4xl font-semibold text-brown-dark sm:text-5xl">
            Contacto
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brown">
            ¿Tenés dudas o querés hacer un pedido? Escribinos, con gusto te ayudamos.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {items.map(({ icon: Icon, label, value, href }, index) => {
            const content = (
              <div className="flex h-full flex-col items-center gap-3 rounded-2xl bg-beige-light/60 p-6 ring-1 ring-beige-dark/40 transition-all duration-300 hover:-translate-y-1 hover:bg-beige-light hover:shadow-md">
                <Icon className="h-7 w-7 text-sage-dark" aria-hidden="true" />
                <span className="text-xs uppercase tracking-widest text-brown/70">{label}</span>
                <span className="font-medium text-brown-dark">{value}</span>
              </div>
            );

            return (
              <Reveal key={label} delay={index * 100}>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <div>{content}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={300}>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-brown/30 px-6 py-3 text-sm font-medium text-brown-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown hover:text-cream hover:shadow-md"
          >
            <InstagramIcon className="h-5 w-5" aria-hidden="true" />
            {contact.instagramHandle}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

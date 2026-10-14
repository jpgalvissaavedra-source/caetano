import { SoapIcon, JarIcon, DropletIcon, LipBalmIcon, LeafIcon } from "@/components/icons";

const ICONS = {
  soap: SoapIcon,
  jar: JarIcon,
  droplet: DropletIcon,
  lipbalm: LipBalmIcon,
  leaf: LeafIcon,
};

// Placeholder visual para las categorías de producto.
// Reemplazar por <Image src="..." /> cuando haya fotos reales.
export default function ProductImagePlaceholder({ icon, label }) {
  const Icon = ICONS[icon] ?? LeafIcon;

  return (
    <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-gradient-to-br from-sage-light/60 via-beige to-beige-dark/70">
      <Icon className="h-14 w-14 text-brown/70" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

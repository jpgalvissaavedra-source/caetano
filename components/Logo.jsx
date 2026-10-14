import Image from "next/image";
import { brand } from "@/lib/site-data";
import { publicFileExists } from "@/lib/public-file-exists";

export default function Logo({ className = "h-10 w-auto" }) {
  const hasLogo = publicFileExists(brand.logo);

  if (!hasLogo) {
    return <span className="font-serif text-2xl tracking-wide text-brown-dark">{brand.name}</span>;
  }

  return (
    <Image
      src={brand.logo}
      alt={brand.name}
      width={845}
      height={406}
      priority
      className={`${className} object-contain mix-blend-multiply`}
    />
  );
}

import Image from "next/image";
import Link from "next/link";
import { assetPath } from "../assetPath";

export function SiteFooter() {
  return (
    <footer className="footer">
      <Link className="logo logo-small" href="/" aria-label="In The Mix home">
        <Image
          className="logo-mark"
          src={assetPath("/images/instagram/in-the-mix-logo.jpg")}
          alt=""
          width={56}
          height={56}
        />
        <span>
          In The Mix
        </span>
      </Link>
      <p>Premium mobile bartending for Little Rock and surrounding areas.</p>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="logo" href="/" aria-label="In The Mix home">
        <Image
          className="logo-mark"
          src="/images/instagram/in-the-mix-logo.jpg"
          alt=""
          width={72}
          height={72}
          priority
        />
        <span>
          In The Mix
        </span>
      </Link>
      <nav className="nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="button button-outline" href="/contact">
        Book now
      </Link>
    </header>
  );
}

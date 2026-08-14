// Placeholder hrefs -- point these at your real profiles before shipping.
const LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/ghimire__saugat/" },
  { label: "Website", href: "https://www.saugat.dev/" },
];

function OutboundArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SocialLinks() {
  return (
    <nav aria-label="Social links" className="flex items-center gap-3 text-xs sm:text-sm">
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="group/link text-white/70 transition hover:text-marigold-light"
        >
          {link.label}
          <OutboundArrowIcon />
        </a>
      ))}
    </nav>
  );
}

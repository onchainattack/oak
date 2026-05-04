import type { IconName } from "../../types";

export default function Icon({ name }: { name: IconName }) {
  return (
    <span className="ui-icon" aria-hidden="true">
      <svg viewBox="0 0 48 48" focusable="false">
        {name === "matrix" && (
          <g>
            <rect x="6" y="8" width="9" height="9" rx="1.5" />
            <rect x="19.5" y="8" width="9" height="9" rx="1.5" className="fill-accent" />
            <rect x="33" y="8" width="9" height="9" rx="1.5" />
            <rect x="6" y="19.5" width="9" height="9" rx="1.5" />
            <rect x="19.5" y="19.5" width="9" height="9" rx="1.5" />
            <rect x="33" y="19.5" width="9" height="9" rx="1.5" className="fill-accent" />
            <rect x="6" y="31" width="9" height="9" rx="1.5" className="fill-accent" />
            <rect x="19.5" y="31" width="9" height="9" rx="1.5" />
            <rect x="33" y="31" width="9" height="9" rx="1.5" />
          </g>
        )}
        {name === "technique" && (
          <g>
            <path d="M11 7h22l4 4v30H11Z" />
            <path d="M16 18l-3 3 3 3M32 18l3 3-3 3M22 27l4-12" />
          </g>
        )}
        {name === "incident" && (
          <g>
            <path d="M24 6l16 8v9c0 11-7 16-16 19-9-3-16-8-16-19v-9Z" />
            <path d="M24 16l-4 9h6l-3 8" className="fill-accent" />
          </g>
        )}
        {name === "actor" && (
          <g>
            <path d="M24 8c-7 0-11 5-11 11v3h22v-3c0-6-4-11-11-11Z" />
            <path d="M13 22h22v6c0 6-5 12-11 12S13 34 13 28Z" />
            <circle cx="20" cy="29" r="1.6" className="fill-accent" />
            <circle cx="28" cy="29" r="1.6" className="fill-accent" />
          </g>
        )}
        {name === "coverage" && (
          <g>
            <path d="M24 5l16 6v10c0 11-7 18-16 22-9-4-16-11-16-22V11Z" />
            <path d="M16 23l6 6 11-12" />
          </g>
        )}
        {name === "citation" && (
          <g>
            <path d="M9 9h17l6 6v24H9Z" />
            <path d="M26 9v6h6" />
            <path d="M14 22l3-4 3 4-3 4ZM23 22l3-4 3 4-3 4Z" className="fill-accent" />
            <path d="M14 33h17" />
            <path d="M37 16l4 4-4 4" />
          </g>
        )}
        {name === "why" && (
          <g>
            <circle cx="16" cy="20" r="9" />
            <circle cx="32" cy="28" r="9" />
            <path d="M16 20h16" />
          </g>
        )}
        {name === "who" && (
          <g>
            <circle cx="14" cy="16" r="4" />
            <circle cx="34" cy="16" r="4" />
            <circle cx="24" cy="32" r="4" />
            <path d="M14 21v6M34 21v6M24 25v0" />
            <path d="M16 26h16M14 28l8 4M34 28l-8 4" />
          </g>
        )}
        {name === "how" && (
          <g>
            <rect x="6" y="20" width="9" height="9" rx="1.5" />
            <rect x="19.5" y="20" width="9" height="9" rx="1.5" />
            <rect x="33" y="20" width="9" height="9" rx="1.5" />
            <path d="M15 24.5h4M28.5 24.5h4" />
            <path d="M17 22.5l2 2-2 2M30.5 22.5l2 2-2 2" className="fill-accent" />
          </g>
        )}
        {name === "contribute" && (
          <g>
            <circle cx="13" cy="11" r="4" />
            <circle cx="13" cy="37" r="4" />
            <circle cx="35" cy="24" r="4" />
            <path d="M13 15v18" />
            <path d="M13 24h12c4 0 6-2 6-5v-3" />
          </g>
        )}
        {name === "market" && (
          <g>
            <path d="M6 41h36" />
            <path d="M11 19v18M11 22v12h-3v-12ZM11 22v12h3v-12Z" className="fill-accent" />
            <path d="M22 12v25M22 16v18h-3v-18ZM22 16v18h3v-18Z" />
            <path d="M33 25v12M33 28v6h-3v-6ZM33 28v6h3v-6Z" className="fill-accent" />
          </g>
        )}
        {name === "evidence" && (
          <g>
            <circle cx="20" cy="22" r="11" />
            <path d="M20 16v12M14 22h12" />
            <path d="M28 30l10 10" />
          </g>
        )}
      </svg>
    </span>
  );
}

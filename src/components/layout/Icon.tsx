import type { IconName } from "../../types";
import { ICON_GROUPS } from "../icons/iconRegistry";

export default function Icon({ name }: { name: IconName }) {
  return (
    <span className="ui-icon" aria-hidden="true">
      <svg viewBox="0 0 48 48" focusable="false">
        {ICON_GROUPS[name] ?? null}
      </svg>
    </span>
  );
}

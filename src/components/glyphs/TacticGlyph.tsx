import { tacticVariant } from "../../lib";
import { TACTIC_GLYPHS } from "./glyphRegistry";

export default function TacticGlyph({ id }: { id: string }) {
  const n = tacticVariant(id);
  return (
    <span className="tactic-glyph" aria-hidden="true">
      <svg viewBox="0 0 48 48" focusable="false">
        {TACTIC_GLYPHS[n] ?? null}
      </svg>
    </span>
  );
}

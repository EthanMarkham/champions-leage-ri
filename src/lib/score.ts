export function getScoreColor(score: number, par: number): string {
  if (score === 1) {
    return "var(--color-ace)";
  }

  const diff = score - par;

  if (diff === 0) {
    return "current";
  }

  if (diff > 0) {
    const bogeyDiff = Math.min(diff, 4);
    return `var(--color-bogey${bogeyDiff})`;
  }

  switch (diff) {
    case -1:
      return "var(--color-birdie)";
    case -2:
      return "var(--color-eagle)";
    case -3:
      return "var(--color-albatross)";
    case -4:
      return "var(--color-condor)";
    default:
      return "current";
  }
}

export function getRelativeScoreColor(score: number): string {
  if (score === 0) {
    return "2D3748";
  }

  if (score > 0) {
    const bogeyDiff = Math.min(score, 4);
    return `var(--color-bogey${bogeyDiff})`;
  }

  switch (score) {
    case -1:
      return "var(--color-birdie)";
    case -2:
      return "var(--color-eagle)";
    case -3:
      return "var(--color-albatross)";
    case -4:
      return "var(--color-condor)";
    default:
      return "current";
  }
}

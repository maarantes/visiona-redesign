export function sanityImageSrcSet(url: string) {
  return [640, 1280, 1920, 2560]
    .map((w) => `${url}?w=${w}&auto=format&q=90 ${w}w`)
    .join(", ");
}

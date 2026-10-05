// A board's link is the board itself, and we promised not to keep those
export const scrub = (text: string) =>
  text
    .replace(/(\/(?:s|api\/board)\/)[^/?#"\\\s]+/g, '$1…')
    .replace(/(\bpage=)[^&#"\\\s]*/g, '$1…');

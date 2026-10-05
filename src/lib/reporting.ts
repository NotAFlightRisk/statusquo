// What error reports may carry: enough to fix the bug, nothing about who hit it
export const privacy = {
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: { allow: ['user-agent'] },
    httpBodies: []
  },
  // A board's link is the board itself, and we promised not to keep those
  beforeSend: <T>(event: T): T =>
    JSON.parse(
      JSON.stringify(event)
        .replace(/(\/(?:s|api\/board)\/)[^/?#"\\\s]+/g, '$1…')
        .replace(/([?&]page=)[^&#"\\\s]*/g, '$1…')
    )
};

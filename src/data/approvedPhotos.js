// User-supplied November 2026 photos, extracted from the PDF and original uploads.
// Shared keys keep service cards, detail pages and galleries consistent.
export const approvedTeamPhotos = {
  'residential-desk': '/assets/hitech/new-uniform/november-2026/residential-security-desk.webp',
  '03': '/assets/hitech/new-uniform/november-2026/bodyguards.webp',
  '06': '/assets/hitech/new-uniform/november-2026/fire-response.webp',
  10: '/assets/hitech/new-uniform/november-2026/fire-demonstration.webp',
  13: '/assets/hitech/new-uniform/november-2026/security-guards-outdoor-formation.webp',
  14: '/assets/hitech/new-uniform/november-2026/security-team-outdoor-briefing.webp',
  15: '/assets/hitech/new-uniform/november-2026/corporate-security-briefing.webp',
  23: '/assets/hitech/new-uniform/november-2026/security-guard-building-entrance.webp',
  24: '/assets/hitech/new-uniform/november-2026/bodyguards.webp',
  25: '/assets/hitech/new-uniform/november-2026/gate-security.webp',
  26: '/assets/hitech/new-uniform/november-2026/commercial-screening.webp',
  27: '/assets/hitech/new-uniform/november-2026/security-team-outdoor-briefing.webp',
  28: '/assets/hitech/new-uniform/november-2026/security-team-wide-briefing.webp',
  29: '/assets/hitech/new-uniform/november-2026/women-security-personnel.webp',
  31: '/assets/hitech/new-uniform/november-2026/security-team-indoor-briefing.webp',
  16: '/assets/hitech/new-uniform/november-2026/security-team-wide-briefing.webp',
  17: '/assets/hitech/new-uniform/november-2026/security-team-wide-briefing.webp',
  18: '/assets/hitech/new-uniform/november-2026/security-team-outdoor-briefing.webp',
  19: '/assets/hitech/new-uniform/november-2026/security-team-wide-briefing.webp',
  20: '/assets/hitech/new-uniform/november-2026/security-guards-outdoor-formation.webp',
  21: '/assets/hitech/new-uniform/november-2026/security-team-outdoor-briefing.webp',
  32: '/assets/hitech/new-uniform/november-2026/security-guards-outdoor-formation.webp',
};
export function approvedTeamPhoto(number) {
  const image = approvedTeamPhotos[number];
  if (!image) throw new Error(`No approved replacement for team photo ${number}`);
  return image;
}

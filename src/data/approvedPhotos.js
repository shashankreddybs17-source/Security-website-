// Company photos and requested uniform retouches. Legacy photo keys are
// resolved here so every section uses the same new-uniform replacement.
export const approvedTeamPhotos = {
  '03': '/assets/hitech/new-uniform/bodyguards.webp',
  '06': '/assets/hitech/new-uniform/fire-response.webp',
  10: '/assets/hitech/new-uniform/fire-demonstration.webp',
  13: '/assets/hitech/new-uniform/security-guards-outdoor-formation.webp',
  14: '/assets/hitech/new-uniform/security-team-outdoor-briefing.webp',
  15: '/assets/hitech/new-uniform/safety-briefing.webp',
  23: '/assets/hitech/new-uniform/security-guard-building-entrance.webp',
  24: '/assets/hitech/new-uniform/bodyguards.webp',
  25: '/assets/hitech/new-uniform/gate-security.webp',
  26: '/assets/hitech/new-uniform/commercial-screening.webp',
  27: '/assets/hitech/new-uniform/security-team-courtyard-briefing.webp',
  28: '/assets/hitech/new-uniform/security-team-formation-briefing.webp',
  29: '/assets/hitech/new-uniform/women-security-personnel.webp',
  31: '/assets/hitech/new-uniform/security-team-indoor-briefing.webp',
  16: '/assets/hitech/new-uniform/security-team-wide-briefing.webp',
  17: '/assets/hitech/new-uniform/security-team-formation-briefing.webp',
  18: '/assets/hitech/new-uniform/security-team-field-training.webp',
  19: '/assets/hitech/new-uniform/security-team-training-ground.webp',
  20: '/assets/hitech/new-uniform/security-team-site-instruction.webp',
  21: '/assets/hitech/new-uniform/security-team-courtyard-briefing.webp',
  32: '/assets/hitech/new-uniform/security-guards-outdoor-formation.webp',
};
export function approvedTeamPhoto(number) {
  const image = approvedTeamPhotos[number];
  if (!image) throw new Error(`No approved replacement for team photo ${number}`);
  return image;
}

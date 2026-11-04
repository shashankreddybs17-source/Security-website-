// Company photos and requested uniform retouches. Legacy photo keys are
// resolved here so every section uses the same new-uniform replacement.
export const approvedTeamPhotos = {
  '03': '/assets/hitech/new-uniform/bodyguards.webp',
  '06': '/assets/hitech/new-uniform/fire-response.webp',
  10: '/assets/hitech/new-uniform/fire-demonstration.webp',
  13: '/assets/hitech/new-uniform/converted-old-10.webp',
  14: '/assets/hitech/new-uniform/converted-old-01.webp',
  15: '/assets/hitech/new-uniform/safety-briefing.webp',
  23: '/assets/hitech/new-uniform/converted-old-08.webp',
  24: '/assets/hitech/new-uniform/bodyguards.webp',
  25: '/assets/hitech/new-uniform/gate-security.webp',
  26: '/assets/hitech/new-uniform/commercial-screening.webp',
  27: '/assets/hitech/new-uniform/converted-old-04.webp',
  28: '/assets/hitech/new-uniform/converted-old-02.webp',
  29: '/assets/hitech/new-uniform/converted-old-09.webp',
  31: '/assets/hitech/new-uniform/converted-old-11.webp',
  16: '/assets/hitech/new-uniform/converted-old-03.webp',
  17: '/assets/hitech/new-uniform/converted-old-02.webp',
  18: '/assets/hitech/new-uniform/converted-old-05.webp',
  19: '/assets/hitech/new-uniform/converted-old-06.webp',
  20: '/assets/hitech/new-uniform/converted-old-07.webp',
  21: '/assets/hitech/new-uniform/converted-old-04.webp',
  32: '/assets/hitech/new-uniform/converted-old-10.webp',
};
export function approvedTeamPhoto(number) {
  const image = approvedTeamPhotos[number];
  if (!image) throw new Error(`No approved replacement for team photo ${number}`);
  return image;
}

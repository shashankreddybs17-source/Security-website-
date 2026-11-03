export const existingServices = [
  {
    id: 'hotel-security',
    title: 'Hotel Security',
    photo: '14',
    text: 'Professional security for hotel entrances, guest areas and parking zones, helping maintain a safe and welcoming environment.',
  },
  {
    id: 'bank-security',
    title: 'Bank Security',
    photo: '24',
    text: 'Vigilance at entrances, premises and sensitive areas, with access control and visitor management for financial institutions.',
  },
  {
    id: 'corporate-office-security',
    title: 'Corporate Office Security',
    photo: '15',
    text: 'Access monitoring, visitor management and premises surveillance for corporate offices, business parks and commercial workplaces.',
  },
  {
    id: 'industrial-security',
    title: 'Industrial Security',
    photo: '13',
    text: 'Gate control, employee and visitor verification, material movement checks and protection of industrial assets.',
  },
  {
    id: 'commercial-security',
    title: 'Commercial Security',
    photo: '26',
    text: 'Professional guards to help protect employees, visitors, property and business assets in commercial buildings.',
  },
  {
    id: 'residential-security',
    title: 'Residential Security',
    photo: '29',
    text: 'Entrance monitoring, visitor and vehicle management, and common-area vigilance for residential apartment communities.',
  },
];

export const allServices = [
  ...existingServices.map((service) =>
    service.id === 'bank-security'
      ? {
          ...service,
          image: '/assets/hitech/team-25.jpeg',
          imageAlt: 'Hi-Tech uniformed security guards standing at an entrance',
        }
      : service.id === 'commercial-security'
        ? {
            ...service,
            image: '/assets/hitech/services/commercial-security-natural.png',
            imageAlt: 'Security officer operating a baggage screening machine',
            fillImage: true,
          }
        : service,
  ),
  {
    id: 'gunman-services',
    image: '/assets/hitech/services/gunman.generated.png',
    imageAlt: 'Armed security guard standing at a building entrance',
    fillImage: true,
    title: 'Gunman Services',
    text: 'Armed security support for premises and assignments requiring an additional level of protection.',
  },
  {
    id: 'housekeeping-services',
    image: '/assets/hitech/services/housekeeping.generated.png',
    imageAlt: 'Housekeeping team cleaning glass and floors in a lobby',
    fillImage: true,
    title: 'Housekeeping Services',
    text: 'Housekeeping support to help maintain clean, orderly and welcoming workplaces and residential premises.',
  },
  {
    id: 'bodyguard-services',
    image: '/assets/hitech/team-24.jpeg',
    imageAlt: 'Two bodyguards in black clothing standing outside a gated property',
    fillImage: true,
    title: 'Bodyguard Services',
    text: 'Personal security support for individuals during daily activities, travel and public appearances.',
  },
  {
    id: 'supervisor-services',
    image: '/assets/hitech/services/bodyguard.generated.png',
    imageAlt: 'Uniformed security supervision team standing outside a building',
    fillImage: true,
    title: 'Supervisor Services',
    text: 'On-site supervision to coordinate security personnel, monitor duty performance and support consistent day-to-day security operations.',
  },
  {
    id: 'event-management-services',
    image: '/assets/hitech/services/event-management.generated.png',
    imageAlt: 'Security officer monitoring visitors at an entrance checkpoint',
    fillImage: true,
    title: 'Event Management Services',
    text: 'Event coordination support, including entry management and on-site assistance for smooth event operations.',
  },
];

import { approvedTeamPhoto } from './approvedPhotos.js';

export const existingServices = [
  {
    id: 'hotel-security',
    title: 'Hotel Security',
    photo: '14',
    image: approvedTeamPhoto('14'),
    text: 'Professional security for hotel entrances, guest areas and parking zones, helping maintain a safe and welcoming environment.',
  },
  {
    id: 'bank-security',
    title: 'Bank Security',
    photo: '24',
    image: approvedTeamPhoto('25'),
    text: 'Vigilance at entrances, premises and sensitive areas, with access control and visitor management for financial institutions.',
  },
  {
    id: 'corporate-office-security',
    title: 'Corporate Office Security',
    photo: '15',
    image: approvedTeamPhoto('15'),
    text: 'Access monitoring, visitor management and premises surveillance for corporate offices, business parks and commercial workplaces.',
  },
  {
    id: 'industrial-security',
    title: 'Industrial Security',
    photo: '13',
    image: approvedTeamPhoto('13'),
    text: 'Gate control, employee and visitor verification, material movement checks and protection of industrial assets.',
  },
  {
    id: 'commercial-security',
    fillImage: true,
    title: 'Commercial Security',
    photo: '26',
    image: approvedTeamPhoto('26'),
    text: 'Professional guards to help protect employees, visitors, property and business assets in commercial buildings.',
  },
  {
    id: 'residential-security',
    title: 'Residential Security',
    photo: '29',
    image: approvedTeamPhoto('29'),
    text: 'Entrance monitoring, visitor and vehicle management, and common-area vigilance for residential apartment communities.',
  },
];

export const allServices = [
  ...existingServices,
  {
    id: 'gunman-services',
    image: '/assets/hitech/new-uniform/gunman.webp',
    imageAlt: 'Armed security guard standing at a building entrance',
    fillImage: true,
    title: 'Gunman Services',
    text: 'Armed security support for premises and assignments requiring an additional level of protection.',
  },
  {
    id: 'housekeeping-services',
    image: '/assets/hitech/new-uniform/housekeeping-lobby.webp',
    imageAlt: 'Housekeeping team cleaning glass and floors in a lobby',
    fillImage: true,
    title: 'Housekeeping Services',
    text: 'Housekeeping support to help maintain clean, orderly and welcoming workplaces and residential premises.',
  },
  {
    id: 'bodyguard-services',
    image: '/assets/hitech/new-uniform/bodyguards.webp',
    imageAlt: 'Two bodyguards in black clothing standing outside a gated property',
    fillImage: true,
    title: 'Bodyguard Services',
    text: 'Personal security support for individuals during daily activities, travel and public appearances.',
  },
  {
    id: 'supervisor-services',
    image: '/assets/hitech/new-uniform/supervisors.webp',
    imageAlt: 'Hi-Tech supervisors in white shirts and black trousers',
    fillImage: true,
    title: 'Supervisor Services',
    text: 'On-site supervision to coordinate security personnel, monitor duty performance and support consistent day-to-day security operations.',
  },
  {
    id: 'event-management-services',
    image: '/assets/hitech/new-uniform/gate-security.webp',
    imageAlt: 'Hi-Tech security team standing at a property entrance',
    fillImage: true,
    title: 'Event Management Services',
    text: 'Event coordination support, including entry management and on-site assistance for smooth event operations.',
  },
];

import oceanImg from '../assets/oc.png'
import hopeBridgeImg from '../assets/HopeBridge.JPG'
import ticketingImg from '../assets/ticketing-system.png'

export const projects = [
  {
    id: 'ocean',
    title: 'OCEAN',
    date: 'September 2023 — December 2023',
    description:
      'Collaborated with a university group to develop Ocean, a website aimed at water conservation and management.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: oceanImg,
    github: 'https://github.com/Senvidu',
    featured: true,
  },
  {
    id: 'hope-bridge',
    title: 'Hope Bridge',
    date: 'November 2024 — March 2025',
    description:
      'Developed a donation platform using Flutter and Spring Boot to connect donors, underprivileged individuals, and businesses for secure and transparent contributions.',
    tech: ['Flutter', 'Spring Boot', 'React'],
    image: hopeBridgeImg,
    github: 'https://github.com/Senvidu',
    featured: false,
  },
  {
    id: 'ticketing-system',
    title: 'Real-time Ticketing System',
    date: 'November 2024 — December 2024',
    description:
      'Implemented a real-time ticketing system to manage and track ticket sales efficiently.',
    tech: ['Spring Boot', 'React'],
    image: ticketingImg,
    github: 'https://github.com/Senvidu',
    featured: false,
  },
]

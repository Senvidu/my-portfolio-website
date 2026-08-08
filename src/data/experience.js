import ivedhaImg from '../assets/Ivedha.jpg'
import gamageImg from '../assets/Gamage.jpg'
import vectorPulseImg from '../assets/Logo final final final.png'

// Consecutive entries that share `companyId` are rendered as a single grouped
// timeline card, so internal career progression (e.g. iVedha) reads clearly.
export const experience = [
  {
    id: 'ivedha-associate',
    companyId: 'ivedha',
    company: 'iVedha Inc.',
    logo: ivedhaImg,
    url: 'https://ivedha.com/',
    location: 'Toronto, Canada',
    role: 'Associate Software Engineer',
    period: 'Aug 2026 — Present',
    current: true,
    description:
      'Work across cloud infrastructure, platform engineering, DevOps, and data engineering, building and maintaining scalable, reliable, and secure cloud-native systems. Develop infrastructure automation and backend solutions using Python and Rust, manage cloud infrastructure on Google Cloud Platform with Terraform, deploy and operate applications on Kubernetes / GKE, and contribute to CI/CD pipelines, cloud operations, production systems, and data-driven solutions.',
    tech: ['GCP', 'Kubernetes', 'GKE', 'Terraform', 'Python', 'Rust', 'Docker', 'CI/CD', 'Infrastructure as Code', 'Cloud Operations'],
  },
  {
    id: 'ivedha-platform',
    companyId: 'ivedha',
    company: 'iVedha Inc.',
    logo: ivedhaImg,
    url: 'https://ivedha.com/',
    location: 'Toronto, Canada',
    role: 'Platform Engineer / Airflow L1 Support Intern',
    period: 'Jan 2026 — Aug 2026',
    current: false,
    description:
      'Handled production monitoring, incident response, and troubleshooting of Apache Airflow pipelines while contributing to platform engineering initiatives such as DAG development, CI/CD automation, Kubernetes deployments, cloud infrastructure, and backend/system development.',
    tech: ['Apache Airflow', 'Python', 'Kubernetes', 'Docker', 'CI/CD', 'Production Monitoring', 'Incident Response', 'Platform Engineering'],
  },
  {
    id: 'gamage',
    companyId: 'gamage',
    company: 'Gamage Recruiters',
    logo: gamageImg,
    url: 'https://gamagerecruiters.lk/',
    location: 'Sri Lanka',
    role: 'Backend Developer Intern',
    period: 'Aug 2025 — Aug 2026',
    current: false,
    description:
      'Developed and maintained RESTful APIs using Node.js and Express.js, designed and optimized MongoDB schemas, implemented JWT/OAuth authentication, integrated backend services with frontend applications, and contributed to testing and deployment workflows.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT', 'OAuth', 'React', 'Docker', 'GitHub Actions'],
  },
  {
    id: 'vectorpulse',
    companyId: 'vectorpulse',
    company: 'VectorPulse',
    logo: vectorPulseImg,
    url: 'https://thevectorpulse.com/',
    location: 'Startup',
    role: 'Co-Founder & CHRO',
    period: '2025 — Present',
    current: true,
    description:
      'Co-founder and Chief Human Resources Officer at VectorPulse, leading talent strategy, recruitment, internal operations, and organizational growth while contributing to overall startup direction.',
    tech: ['Startup Operations', 'HR Strategy', 'Team Building', 'Leadership'],
  },
]

// "featured" tags represent the current professional direction (Cloud / DevOps / Platform)
// and are visually emphasized in the UI.
export const skillCategories = [
  {
    number: '01',
    title: 'Cloud & Infrastructure',
    icon: 'fa-solid fa-cloud',
    size: 'lg',
    skills: [
      { name: 'Google Cloud Platform', featured: true },
      { name: 'Kubernetes', featured: true },
      { name: 'GKE', featured: true },
      { name: 'Terraform', featured: true },
      { name: 'Docker', featured: true },
      { name: 'Infrastructure as Code', featured: true },
    ],
  },
  {
    number: '02',
    title: 'DevOps & Platform',
    icon: 'fa-solid fa-diagram-project',
    size: 'lg',
    skills: [
      { name: 'CI/CD', featured: true },
      { name: 'GitHub Actions', featured: false },
      { name: 'Apache Airflow', featured: true },
      { name: 'Production Monitoring', featured: false },
      { name: 'Incident Response', featured: false },
      { name: 'Infrastructure Automation', featured: false },
      { name: 'Platform Engineering', featured: false },
      { name: 'Cloud Operations', featured: false },
    ],
  },
  {
    number: '03',
    title: 'Programming',
    icon: 'fa-solid fa-code',
    size: 'md',
    skills: [
      { name: 'Python', featured: true },
      { name: 'Rust', featured: true },
      { name: 'Java', featured: false },
      { name: 'JavaScript', featured: false },
      { name: 'TypeScript', featured: false },
    ],
  },
  {
    number: '04',
    title: 'Backend',
    icon: 'fa-solid fa-server',
    size: 'md',
    skills: [
      { name: 'Node.js', featured: false },
      { name: 'Express.js', featured: false },
      { name: 'Spring Boot', featured: false },
      { name: 'REST APIs', featured: false },
    ],
  },
  {
    number: '05',
    title: 'Databases',
    icon: 'fa-solid fa-database',
    size: 'md',
    skills: [
      { name: 'PostgreSQL', featured: false },
      { name: 'MySQL', featured: false },
      { name: 'MongoDB', featured: false },
      { name: 'H2', featured: false },
    ],
  },
  {
    number: '06',
    title: 'Tools',
    icon: 'fa-solid fa-toolbox',
    size: 'md',
    skills: [
      { name: 'Git', featured: false },
      { name: 'GitHub', featured: false },
      { name: 'Postman', featured: false },
      { name: 'VS Code', featured: false },
    ],
  },
]

export type Achievement = {
  id: '01' | '02' | '03' | '04';
  image: string;
  alt: string;
  caption: string;
  event: string;
  year: string;
  credit: string;
};

export type PressOutlet = {
  name: string;
  logo: string | null;
  homepage: string | null;
  verified: boolean;
  fallbackText: string;
};

export const achievements: Achievement[] = [
  {
    id: '01',
    image: '/images/achievements/achievement-01.jpg',
    alt: 'Suryakanta Lenka and Tripathy Divyajyoti Senapati holding ISEF finalist certificates and IRIS awards',
    caption: '',
    event: 'IRIS recognition',
    year: '2025-26',
    credit: 'SeriScope team',
  },
  {
    id: '02',
    image: '/images/achievements/achievement-02.jpg',
    alt: 'SeriScope team representing India at the Regeneron ISEF stage in Phoenix',
    caption: '',
    event: 'Regeneron ISEF, Phoenix',
    year: '2026',
    credit: 'SeriScope team',
  },
  {
    id: '03',
    image: '/images/achievements/achievement-03.jpg',
    alt: 'SeriScope students with their mentor after receiving medals at the IRIS National Fair',
    caption: '',
    event: 'IRIS National Fair',
    year: '2025-26',
    credit: 'SeriScope team',
  },
  {
    id: '04',
    image: '/images/achievements/achievement-04.jpg',
    alt: 'NITI Aayog and Atal Innovation Mission recognition panel celebrating SeriScope at ISEF',
    caption: '',
    event: 'Atal Innovation Mission recognition',
    year: '2026',
    credit: 'Atal Innovation Mission',
  },
];

export const pressOutlets: PressOutlet[] = [
  {
    name: 'The Prameya',
    logo: null,
    homepage: 'https://www.prameya.com/',
    verified: true,
    fallbackText: 'PRAMEYA',
  },
  {
    name: 'Samaya',
    logo: null,
    homepage: 'https://www.samayaepaper.com/about-us',
    verified: true,
    fallbackText: 'SAMAYA',
  },
  {
    name: 'The Sakala',
    logo: null,
    homepage: 'https://www.thesakala.in/about-us',
    verified: true,
    fallbackText: 'THE SAKALA',
  },
  {
    name: 'Pragativadi',
    logo: null,
    homepage: 'https://epaper.pragativadi.com/',
    verified: true,
    fallbackText: 'PRAGATIVADI',
  },
  {
    name: 'Focus Feature',
    logo: null,
    homepage: null,
    verified: false,
    fallbackText: 'FOCUS FEATURE',
  },
];

export const researchPaper = {
  title:
    'SeriScope: A Low-Cost Edge-AI System for Fertility and Disease Assessment of Tassar Silkworm Eggs',
  description:
    'Trace SeriScope from field sampling and microscopy to model evaluation, explainability, and edge deployment.',
  openUrl: '/research/seriscope-project-report.pdf',
  downloadUrl: '/research/seriscope-project-report.pdf',
  fileSize: '7.6 MB',
};

export const routes = [
  { href: '/technology', label: 'Technology' },
  { href: '/research', label: 'Research' },
  { href: '/impact', label: 'Impact' },
  { href: '/story', label: 'Story' },
];

export const pageContent = {
  technology: {
    eyebrow: 'Technology',
    title: 'A compact diagnostic chain, designed for the field.',
    intro:
      'SeriScope combines microscopy, image processing, deep learning, explainability, and embedded computing in one operator-focused workflow.',
    image: '/images/research/interface.png',
    imageAlt: 'SeriScope diagnostic interface showing model results',
    sections: [
      [
        '01',
        'Prepare',
        'A sample is prepared for optical capture using a repeatable microscopy workflow.',
      ],
      [
        '02',
        'Acquire',
        'The device captures microscopic image data under practical field constraints.',
      ],
      [
        '03',
        'Interpret',
        'Computer vision and classification models screen for Pebrine and assess egg fertility.',
      ],
      [
        '04',
        'Decide',
        'Explainable outputs support a trained operator while inference remains fully offline.',
      ],
    ],
  },
  research: {
    eyebrow: 'Research',
    title: 'Built on real samples, not a laboratory shortcut.',
    intro:
      'More than 1,400 field examples inform a multi-model evaluation spanning disease screening, fertility assessment, visual explanation, and embedded deployment.',
    image: '/images/research/gradcam.png',
    imageAlt: 'Grad-CAM explainability output from the SeriScope research',
    sections: [
      [
        '01',
        'Field-grounded data',
        'Samples were collected in Tasar sericulture contexts and documented through a practical microscopy pipeline.',
      ],
      [
        '02',
        'Model comparison',
        'Five classification models were evaluated to understand performance and deployment trade-offs.',
      ],
      [
        '03',
        'Responsible interpretation',
        'Visual explanations and human oversight keep the diagnostic result legible to an operator.',
      ],
      [
        '04',
        'Next validation',
        'Larger datasets, external validation, hardware integration, and field trials define the next research phase.',
      ],
    ],
  },
  impact: {
    eyebrow: 'Impact',
    title: 'Earlier insight, closer to the people who need it.',
    intro:
      'The system is shaped around grainages and sericulture centres where connectivity, specialist access, time, and equipment can all be limited.',
    image: '/images/research/fieldwork.png',
    imageAlt: 'SeriScope field visit to a Tasar silk farm',
    sections: [
      [
        '01',
        'Technicians',
        'A repeatable visual workflow can support faster screening and more consistent documentation.',
      ],
      [
        '02',
        'Farmers',
        'Earlier, local decisions can reduce avoidable loss and strengthen rural livelihoods.',
      ],
      [
        '03',
        'Researchers',
        'Structured field imagery and model evaluation create a base for deeper validation.',
      ],
      [
        '04',
        'Institutions',
        'Low-cost offline hardware makes responsible adoption more practical beyond major laboratories.',
      ],
    ],
  },
  story: {
    eyebrow: 'Story',
    title: 'From an Atal Tinkering Lab to a global science stage.',
    intro:
      'SeriScope grew through field visits, microscopy experiments, model evaluation, hardware trials, and a steady insistence that the final system work outside a presentation hall.',
    image: '/images/achievements/achievement-02.jpg',
    imageAlt: 'SeriScope team representing India at the Regeneron ISEF stage',
    sections: [
      [
        'Team',
        'Suryakanta Lenka and Tripathy Divyajyoti Senapati',
        'Student researchers at DAV Public School, Unit VIII, Bhubaneswar.',
      ],
      ['Mentor', 'Tanmay Kumar Nayak', 'ATL Coordinator and project mentor.'],
      [
        'Recognition',
        'IRIS to Regeneron ISEF',
        'A national journey that reached the world’s largest pre-college science and engineering fair.',
      ],
      [
        'Home',
        'Bhubaneswar, Odisha',
        'Nurtured at the Atal Tinkering Lab, DAV Public School Unit VIII.',
      ],
    ],
  },
} as const;

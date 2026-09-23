export interface Experience {
  content: string;
  organisation: string;
  from: string;
  to?: string;
  past?: boolean;
}

/** Work/study timeline on the home page. Strings containing a dot are i18n keys. */
export const experiences: Experience[] = [
  {
    content: 'home.experiences.uni.content',
    organisation: 'home.experiences.uni.organisation',
    from: '2018',
  },
  {
    content: 'home.experiences.andrena.content',
    organisation: 'andrena objects ag',
    from: '2025',
  },
  {
    content: 'home.experiences.iss.content',
    organisation: 'home.experiences.iss.organisation',
    from: '2021',
    to: '2025',
    past: true,
  },
];

export const CV_URL = 'https://rxresu.me/elias.schaut/lebenslauf';

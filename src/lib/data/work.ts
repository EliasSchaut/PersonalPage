/**
 * Volunteer / activity timeline shown on the About page.
 * `title`/`desc` are either literal strings or i18n keys (resolved when they contain a dot).
 */
export interface WorkEvent {
  title: string;
  desc: string;
  from: string;
  /** `undefined` means "today" (translated). */
  to?: string;
}

export const work: WorkEvent[] = [
  { title: 'home.work.event.kit_gamejam', desc: 'home.work.event.kit_gamejam_desc', from: '2024' },
  { title: 'home.work.event.level42', desc: 'home.work.event.level42_desc', from: '2024' },
  {
    title: 'eezi - Eine Einführung zum Informatikstudium',
    desc: 'home.work.event.eezi_desc',
    from: '2021',
    to: '2025',
  },
  { title: 'home.work.event.hadiko_vev', desc: 'home.work.event.hadiko_vev_desc', from: '2020' },
  { title: 'HaDiKo e.V.', desc: 'home.work.event.hadiko_ev_desc', from: '2020' },
  {
    title: 'home.work.event.lila_pause',
    desc: 'home.work.event.lila_pause_desc',
    from: '2018',
    to: '2024',
  },
  {
    title: 'Akk - Arbeitskreis Kultur und Kommunikation',
    desc: 'home.work.event.akk_desc',
    from: '2018',
    to: '2024',
  },
  { title: 'home.work.event.fsmi', desc: 'home.work.event.fsmi_desc', from: '2018', to: '2020' },
  {
    title: 'home.work.event.mannheim',
    desc: 'home.work.event.mannheim_desc',
    from: '2014',
    to: '2018',
  },
  { title: 'home.work.event.moll', desc: 'home.work.event.moll_desc', from: '2010', to: '2018' },
];

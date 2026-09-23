export interface Project {
  name: string;
  /** i18n key under `projects.subcontents`. */
  key: string;
  href: string;
}

export const projects: Project[] = [
  { name: 'WatchVote', key: 'watchvote', href: 'https://github.com/EliasSchaut/WatchVote' },
  { name: 'BdayHero', key: 'bdayhero', href: 'https://github.com/EliasSchaut/BdayHero' },
  { name: 'KaraokeList', key: 'karaokelist', href: 'https://github.com/EliasSchaut/KaraokeList' },
  { name: 'Winvite', key: 'winvite', href: 'https://github.com/EliasSchaut/Winvite' },
  { name: 'SnakeArena', key: 'snakearena', href: 'https://github.com/EliasSchaut/SnakeArena' },
  { name: 'DiscordDungeon', key: 'discorddungeon', href: 'https://discord.gg/4SdzCaenKs' },
  {
    name: 'Discord Bots',
    key: 'discordbots',
    href: 'https://github.com/EliasSchaut?tab=repositories&q=Bot',
  },
  { name: 'Web Beginnings', key: 'webbeginnings', href: 'https://legacy.schaut.dev' },
];

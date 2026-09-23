export interface Social {
  name: string;
  href: string;
  /** iconify icon id (loaded via unplugin-icons) */
  icon: 'mail' | 'github' | 'itchio' | 'discord' | 'steam';
}

export const socials: Social[] = [
  { name: 'Mail', href: 'mailto:hi@schaut.dev', icon: 'mail' },
  { name: 'GitHub', href: 'https://github.com/EliasSchaut', icon: 'github' },
  { name: 'itch.io', href: 'https://kid-ilias.itch.io/', icon: 'itchio' },
  { name: 'Discord', href: 'https://discordapp.com/users/501805867369496576', icon: 'discord' },
  { name: 'Steam', href: 'https://steamcommunity.com/id/kid_ilias', icon: 'steam' },
];

export const site = {
  url: 'https://schaut.dev',
  name: 'Elias Lorenz Schaut',
  title: 'Elias Lorenz Schaut',
  description: "Elias Lorenz Schaut's personal website and portfolio",
  keywords: 'elias, lorenz, schaut, kit, karlsruhe',
  email: 'hi@schaut.dev',
  /** shown in the imprint */
  imprintEmail: 'admin@schaut.dev',
  repo: 'https://github.com/EliasSchaut/PersonalPage',
  kofi: 'https://ko-fi.com/kid_ilias',
} as const;

export interface DonateOption {
  content: string;
  href?: string;
  icon: 'paypal' | 'kofi' | 'github' | 'bank';
}

export const donateOptions: DonateOption[] = [
  { href: 'https://paypal.me/eschaut', content: 'PayPal', icon: 'paypal' },
  { href: 'https://ko-fi.com/kid_ilias', content: 'Ko-Fi', icon: 'kofi' },
  { href: 'https://github.com/sponsors/EliasSchaut', content: 'GitHub Sponsor', icon: 'github' },
  { content: 'IBAN: DE24 6605 0101 1022 9775 48', icon: 'bank' },
];

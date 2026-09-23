export interface Tool {
  name: string;
  href: string;
  icon: string;
}

/** Skill icons shown on the home page, grouped in display order. */
export const tools: Tool[] = [
  // Languages
  { name: 'TypeScript', href: 'https://www.typescriptlang.org/', icon: 'typescript-original' },
  {
    name: 'JavaScript',
    href: 'https://developer.mozilla.org/docs/Web/javascript/',
    icon: 'javascript-original',
  },
  { name: 'Java', href: 'https://www.java.com/', icon: 'java-original' },
  { name: 'Python', href: 'https://www.python.org/', icon: 'python-original' },
  { name: 'C', href: 'https://gcc.gnu.org/', icon: 'c-original' },
  { name: 'C++', href: 'https://isocpp.org/', icon: 'cplusplus-original' },
  {
    name: 'GDScript',
    href: 'https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript',
    icon: 'godot-original',
  },
  { name: 'LaTeX', href: 'https://www.latex-project.org/', icon: 'latex-original' },
  { name: 'HTML', href: 'https://developer.mozilla.org/docs/Web/HTML', icon: 'html5-original' },
  { name: 'CSS', href: 'https://developer.mozilla.org/docs/Web/CSS', icon: 'css3-original' },
  // Infrastructure & tools
  { name: 'GitHub', href: 'https://github.com/', icon: 'github-original' },
  { name: 'GitLab', href: 'https://gitlab.com/', icon: 'gitlab-original' },
  { name: 'Git', href: 'https://git-scm.com/', icon: 'git-original' },
  { name: 'npm', href: 'https://www.npmjs.com/', icon: 'npm-original-wordmark' },
  // Libraries & frameworks
  { name: 'Vue.js', href: 'https://vuejs.org/', icon: 'vuejs-original' },
  { name: 'Nuxt', href: 'https://nuxt.com/', icon: 'nuxtjs-original' },
  { name: 'NestJS', href: 'https://nestjs.com/', icon: 'nestjs-original' },
  { name: 'Tailwind CSS', href: 'https://tailwindcss.com/', icon: 'tailwindcss-original' },
  { name: 'Bootstrap', href: 'https://getbootstrap.com/', icon: 'bootstrap-original' },
  { name: 'GraphQL', href: 'https://graphql.org/', icon: 'graphql-plain' },
  { name: 'Prisma', href: 'https://www.prisma.io/', icon: 'prisma-original' },
  { name: 'Node.js', href: 'https://nodejs.org/', icon: 'nodejs-original' },
  { name: 'Express', href: 'https://expressjs.com/', icon: 'express-original' },
  { name: 'ESLint', href: 'https://eslint.org/', icon: 'eslint-original' },
  { name: 'Prettier', href: 'https://prettier.io/', icon: 'prettier-original' },
  { name: 'discord.js', href: 'https://discord.js.org/', icon: 'discordjs-original' },
  // External services & databases
  { name: 'Docker', href: 'https://www.docker.com/', icon: 'docker-original' },
  { name: 'nginx', href: 'https://nginx.org/', icon: 'nginx-original' },
  { name: 'PostgreSQL', href: 'https://www.postgresql.org/', icon: 'postgresql-original' },
  { name: 'SQLite', href: 'https://www.sqlite.org/', icon: 'sqlite-original' },
  { name: 'Prometheus', href: 'https://prometheus.io/', icon: 'prometheus-original' },
  { name: 'Redis', href: 'https://redis.io/', icon: 'redis-original' },
  // Self-hosted services
  { name: 'Grafana', href: 'https://grafana.com/', icon: 'grafana-original' },
  // OS & software
  { name: 'Debian', href: 'https://www.debian.org/', icon: 'debian-original' },
  { name: 'Windows', href: 'https://www.microsoft.com/windows', icon: 'windows11-original' },
  { name: 'Raspberry Pi', href: 'https://www.raspberrypi.com/', icon: 'raspberrypi-original' },
  { name: 'Godot Engine', href: 'https://godotengine.org/', icon: 'godot-original' },
  { name: 'JetBrains IDEs', href: 'https://www.jetbrains.com/ides/', icon: 'jetbrains-original' },
  { name: 'Bash', href: 'https://www.gnu.org/software/bash/', icon: 'bash-original' },
  { name: 'Oh My Zsh', href: 'https://ohmyz.sh/', icon: 'ohmyzsh-original' },
  { name: 'Discord', href: 'https://discord.com/', icon: 'discord-original' },
  { name: 'Microsoft 365', href: 'https://microsoft365.com/', icon: 'ms365-original' },
  { name: 'Postman', href: 'https://www.postman.com/', icon: 'postman-original' },
];

/** URL slug for a tag (`Meta` -> `meta`, `Ü Test` -> `u-test`). Shared by server and client. */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

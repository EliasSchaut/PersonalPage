import { expect, test } from '@playwright/test';

test.describe('pages', () => {
  for (const path of [
    '/',
    '/de',
    '/about',
    '/projects',
    '/articles',
    '/de/articles',
    '/articles/tags',
    '/articles/tags/meta',
    '/resources',
    '/imprint',
    '/privacy',
    '/kofi',
    '/newsletter',
  ]) {
    test(`${path} renders`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toContainText('Elias Lorenz Schaut');
    });
  }

  test('home shows typewriter intro', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Hey');
    await expect(page.getByText("I'm Elias Lorenz Schaut")).toBeVisible();
  });

  test('unknown route is a 404', async ({ page }) => {
    const res = await page.goto('/does-not-exist');
    expect(res?.status()).toBe(404);
    await expect(page.getByText('404')).toBeVisible();
  });

  test('/donate opens the donate modal', async ({ page }) => {
    await page.goto('/donate');
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('PayPal')).toBeVisible();
  });
});

test.describe('articles', () => {
  test('article renders title, reading time and toc', async ({ page }) => {
    await page.goto('/articles/bday24');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bday 24');
    await expect(page.getByText(/min read/)).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Contents' })).toBeVisible();
  });

  test('german article renders and MDC markup was converted', async ({ page }) => {
    await page.goto('/de/articles/bday22_meta');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bday Metagame 22');
    expect(await page.locator('article mark').count()).toBeGreaterThan(5);
    await expect(page.locator('html')).toHaveAttribute('lang', 'de-DE');
  });

  test('article has SEO meta tags', async ({ page }) => {
    await page.goto('/articles/bday24');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://schaut.dev/articles/bday24',
    );
    await expect(page.locator('link[hreflang="de"]')).toHaveAttribute(
      'href',
      'https://schaut.dev/de/articles/bday24',
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://schaut.dev/articles/covers/Bday24.png',
    );
  });

  test('tag page lists tagged articles', async ({ page }) => {
    await page.goto('/articles/tags/meta');
    expect(await page.locator('main li a[href^="/articles/"]').count()).toBeGreaterThan(2);
  });

  test('search filters the article list', async ({ page }) => {
    await page.goto('/articles');
    const before = await page.locator('main nav li').count();
    await page.getByPlaceholder('Search articles …').fill('Metagame 24');
    await expect.poll(() => page.locator('main nav li').count()).toBeLessThan(before);
    await expect(page.locator('main nav li').first()).toContainText('Metagame 24');
  });
});

test.describe('feeds', () => {
  test('rss feeds and sitemap are served', async ({ request }) => {
    for (const path of ['/rss.xml', '/de/rss.xml']) {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
      expect(res.headers()['content-type']).toContain('application/rss+xml');
      expect(await res.text()).toContain('<item>');
    }
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain('https://schaut.dev/de/articles/bday24');
  });
});

test.describe('settings', () => {
  test('language toggle switches to the german url and sets the cookie', async ({
    page,
    context,
  }) => {
    await page.goto('/articles');
    await page.getByRole('link', { name: 'German' }).click();
    await expect(page).toHaveURL(/\/de\/articles$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Kreativ-Blog');
    const cookie = (await context.cookies()).find((c) => c.name === 'i18n_redirected');
    expect(cookie?.value).toBe('de');
  });

  test('theme toggle adds the dark class', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const button = page.getByRole('button', { name: /System|Light|Dark/ });
    // cycle until "dark" is selected
    for (let i = 0; i < 3; i++) {
      if ((await button.getAttribute('aria-label')) === 'Dark') break;
      await button.click();
    }
    await expect(html).toHaveClass(/dark/);
  });
});

test.describe('api', () => {
  test('contact endpoint rejects invalid input', async ({ request }) => {
    const res = await request.post('/api/contact', { data: { email: 'nope', message: '' } });
    expect(res.status()).toBe(400);
  });
});

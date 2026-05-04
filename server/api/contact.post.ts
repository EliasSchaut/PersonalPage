import nodemailer from 'nodemailer';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5000;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody<{ email?: string; message?: string }>(event);

  const email = body?.email?.trim();
  const message = body?.message?.trim();

  if (!email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and message are required.',
    });
  }

  if (!EMAIL_PATTERN.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email address.',
    });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `Message must be at most ${MAX_MESSAGE_LENGTH} characters.`,
    });
  }

  const { host, port, user, password, secure, from, to } = config.smtp;

  if (!host || !to) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Mail service is not configured.',
    });
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Boolean(secure),
    auth: user && password ? { user, pass: password } : undefined,
  });

  await transporter.sendMail({
    from: from || user,
    to,
    replyTo: email,
    subject: `Contact form message from ${email}`,
    text: `From: ${email}\n\n${message}`,
    html: `<p><strong>From:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(
      message,
    ).replace(/\n/g, '<br>')}</p>`,
  });

  await sendRedirect(event, '/?contact=sent', 303);
});

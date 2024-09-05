import { createTransport } from 'nodemailer';

export async function sendEmail(emailOption: EmailOption): Promise<void> {
  const transporter = createTransport({
    host: process.env.SMTP_SERVER_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_SERVER_USERNAME,
      pass: process.env.SMTP_SERVER_PASSWORD,
    },
  });

  await transporter.sendMail(
    {
      from: `"No-reply" <${process.env.SMTP_SERVER_USERNAME}>`,
      to: emailOption.to,
      subject: emailOption.subject,
      text: emailOption.text,
      html: emailOption.html,
    },
    (error, info) => {
      if (error) {
        console.error('❌ Error:', error.message);
      }
    },
  );
}

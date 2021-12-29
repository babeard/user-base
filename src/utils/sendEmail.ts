import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
  const { user, pass } = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: `"Fred Foo" <foo@example.com>`, // sender address
    to: email, // list of receivers
    subject: "Confirm Email Address",
    text: `${url}`,
    html: `<a href="${url}">${url}</a>`,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

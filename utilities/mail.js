const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "9046bf8df1f437",
    pass: "0a7b7bd27dd355",
  },
});

const sendWelcomeEmail = (email, name, acc_activation_token) => {
  console.log("acc_token :: :: ::",acc_activation_token)
  console.log("email :: :: ::",email)
  console.log("name :: :: ::",name)
  transport.sendMail(
    {
      from: '"Example Team" <vatsal@example.com>',
      to: `${email}`,
      subject: "Nice Nodemailer test",
      text: `Hey there, its our first message sent with Nodemailer, welcome onboard ${name}!`,
      html: `<b>Welcome Node Team ${name}! </b>
        <p>Activate your account with the following link: </p>
        <a href=>"localhost:1000/api/user/activate?token=${acc_activation_token}"</a>
      `,
    },
    (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Message sent: %s", info.messageId);
    }
  );
};

module.exports = { sendWelcomeEmail };


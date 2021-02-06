const nodemailer = require('nodemailer');
const { keys } = require('../../config/keys.config');
const { pugEngine } = require('nodemailer-pug-engine');
const { sendTo } = require('../../utils/email/email.utils');

class EmailSmtp {

  constructor() {
    this.transporter = this.smtpConfig();
    this.transporter.use('compile', pugEngine({
      templateDir: __dirname + '/templates',
    }));
  }

  smtpConfig() {
    return nodemailer.createTransport({
      host: keys.get('HOST_SMTP'),
      port: 587,
      secure: false,
      auth: {
        user: keys.get('USER_SMTP_AWS'),
        pass: keys.get('PASSWORD_SMTP_AWS'),
      },
    });
  }

  async sendEmail(to, subject, template, context) {
    await this.transporter.sendMail({
      from: keys.get('ADMIN_SERVER_EMAIL'),
      to: sendTo(to),
      subject,
      template,
      ctx: {
        context
      }
    });
  }
}

module.exports = {
  EmailSmtp
}

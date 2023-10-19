import path from 'path';
import ejs from 'ejs';
import sendgrid from '@sendgrid/mail';
require('dotenv').config();

export const sendEmail = async (to: string, subject: string, template: string, data: any) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');
  const from = process.env.MAIL_SENDER_EMAIL || "lee@aerovision.io";
  const html = await ejs.renderFile<string>(path.join(__dirname, `../../templates/${template}.ejs`), data);
  let message = { from, to, subject, html };
  const msg = { ...message, text: 'iDENTIFY'};

  try {
      await sendgrid.send(msg);
  } catch (error) {
      console.log(error);
      throw error;
  }
};

export const sendInvitation = async (to: string, name: string, invited_by: string, password: string, token: string) => {
  try {
    const base_url = process.env.FRONTEND_URL || 'http://localhost:3000';
    await sendEmail(to, 'Welcome to iDENTIFY!', 'invitation', {
      url: `${base_url}/accept-invitation?token=${token}`,
      name: name,
      invited_by,
      password,
    });
    return true;
  } catch (error: any) {
    console.log('Error during sending invitation');
    console.log(error);
    console.log(JSON.stringify(error.response.body));
    throw error;
  }
}

export const sendResetPassword = async (to: string, name: string, token: string) => {
  try {
    const base_url = process.env.FRONTEND_URL || 'http://localhost:3000';
    await sendEmail(to, 'Reset your password!', 'reset-password', {
      url: `${base_url}/reset-password?token=${token}`,
      name: name,
    });
    return true;
  } catch (error: any) {
    console.log('Error during sending invitation');
    console.log(error);
    console.log(JSON.stringify(error.response.body));
    throw error;
  }
}
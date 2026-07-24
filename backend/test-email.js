require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Testing email configuration...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***hidden***' : 'NOT SET');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email connection FAILED:', error);
    console.log('\nPossible fixes:');
    console.log('1. Generate new Gmail App Password: https://myaccount.google.com/apppasswords');
    console.log('2. Make sure 2-Factor Authentication is enabled');
    console.log('3. Check if Gmail is blocking "Less secure app access"');
  } else {
    console.log('✅ Email connection successful!');
    
    // Send test email
    console.log('\nSending test email...');
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: 'Test Email from NexicWeb',
      html: `
        <h2>Email Test Successful! ✅</h2>
        <p>Your email configuration is working correctly.</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      `
    }, (err, info) => {
      if (err) {
        console.error('❌ Failed to send test email:', err);
      } else {
        console.log('✅ Test email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Check your inbox:', process.env.EMAIL_USER);
      }
      process.exit(0);
    });
  }
});

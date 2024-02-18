export default function donorOTP(donor, message) {
  return `
  <html lang="en">
  <head>
    <style>
      body {
        font-family: sans-serif;
        padding: 40px;
      }
      .blue {
        color: blue;
      }
    </style>
  </head>
  <body>
    <h1 style="text-align: center">Hello from ReGift.</h1>

    <hr />
    <p>Hello ${donor.firstName} ${donor.lastName},</p>
    <p>We have gotten a request from you to ${message}.</p>
    <p>Please verify your email by using the OTP below.</p>

    <h2>${donor.otp}</h2>

    <p>If this was not you contact us immediately.</p>
    <p>
      Best regards,<br />
      Regift <br /><br />
      <span class="blue">
        +91 7977601610 <br />
        imtiyazsayyidwork@gmail.com
      </span>
    </p>
  </body>
</html>
  `;
}

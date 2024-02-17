export default function organisationPasswordReset(organisation) {
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
    <p>Hello ${organisation.name},</p>
    <p>You have successfully reset your password.</p>
    <p>If this was not you contact us immediately.</p>
    <p>
      Best regards,<br />
      Imtiyaz Sayyid.<br /><br />
      <span class="blue">
        +91 7977601610 <br />
        imtiyazsayyidwork@gmail.com
      </span>
    </p>
  </body>
</html>




  `;
}

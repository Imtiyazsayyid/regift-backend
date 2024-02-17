export default function welcomeOrganisation(organisation) {
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
    <h1 style="text-align: center">Welcome to ReGift.</h1>

    <hr />
    <p>Welcome ${organisation.name},</p>
    <p>Regift would like to extend our sincere gratitude for registering with us.</p>
    <p>
      Your registration is currently being processed, and our team is diligently reviewing the information provided. We
      aim to ensure that all registrations are handled promptly and accurately.
    </p>
    <p>
      Please be assured that we are working diligently to finalize your registration. We kindly ask for your patience as
      we complete this process. Once your registration has been approved, you will receive a confirmation email
      containing further details and next steps.
    </p>

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

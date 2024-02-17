export default function rejectOrganisation(organisation) {
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
    <p>Regift would like to extend our sincere gratitude for registering with us.</p>
    <p>
      Unfortunately, Your application for an account has been <b>rejected</b>. If you think this is a mistake please
      contact us using the information below.
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

export default function welcomeApprovedOrganisation(organisation) {
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
    <p>Your account has been <b>approved</b>. You may now log in with the following credentials:</p>

    <div>
      <p><span style="font-weight: bold">Email:</span>${organisation.email}</p>
      <p><span style="font-weight: bold">Password:</span>${organisation.password}</p>
    </div>

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

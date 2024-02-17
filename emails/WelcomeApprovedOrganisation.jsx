import React from "react";
const { Body, Container, Html, Preview, Text, Link, Tailwind } = require("@react-email/components");

const WelcomeApprovedOrganisation = ({ email, password, name }) => {
  return (
    <Html>
      <Preview>Welcome To ReGift.</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container>
            <Text className="font-bold text-3xl mb-10">Welcome To ReGift, {name}.</Text>

            <p>Thank you for joining us. Here are your credentials</p>

            <hr />

            <div className="my-10">
              <h3>Your Login Details.</h3>
              <p>
                <span className="font-bold">Email: </span>
                {email}
              </p>
              <p>
                <span className="font-bold">Password:</span>
                {password}
              </p>
            </div>

            <hr />

            <p>
              Please Login at{" "}
              <a href="https://regift-organisation.vercel.app/organisation" target="_blank">
                Regift Organisation
              </a>
            </p>
            <p className="mt-10">
              Regards, <br /> Regift Team.
            </p>
            <p>
              +91 7977601610 <br /> <span className="text-blue-500">imtiyazsayyidwork@gmail.com</span>
            </p>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeApprovedOrganisation;

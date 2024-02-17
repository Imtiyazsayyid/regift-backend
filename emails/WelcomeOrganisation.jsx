// import { Body, Container, Html, Preview, Text, Link, Tailwind } from "@react-email/components";
// import React from "react";

const { Body, Container, Html, Preview, Text, Link, Tailwind } = require("@react-email/components");

const WelcomeOrganisation = ({ name }) => {
  return (
    <Html>
      <Preview>Welcome To ReGift, {name}.</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container>
            <Text className="font-bold text-3xl mb-10">Welcome To ReGift.</Text>
            <p>Thank you for registering with us. Please wait while we approve your application</p>
            <p className="my-1">This usually takes 1-3 days.</p>
            <p>If you do not recieve an email within this time frame please contact us.</p>

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

export default WelcomeOrganisation;

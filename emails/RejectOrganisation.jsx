import { Body, Container, Html, Preview, Text, Link, Tailwind } from "@react-email/components";
import React from "react";

const WelcomeApprovedOrganisation = ({ email, password, name }) => {
  return (
    <Html>
      <Preview>Hello from ReGift.</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container>
            <Text className="font-bold text-3xl mb-10">Hello from ReGift, {name}.</Text>

            <p>
              Thank you for registering with us. <br /> We regret to inform you that your application has been{" "}
              <span className="text-red-500">rejected</span>. <br /> If you think this is mistake contact us on the
              provided contact information.
            </p>

            <p className="mt-5">
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

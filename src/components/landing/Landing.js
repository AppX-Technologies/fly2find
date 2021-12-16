import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import JoinUs from './JoinUs';
import Section from './Section';
import Title from './Title';

const section1Texts = [
  `Most General Aviation (GA) pilots are always ready for a flight to anywhere!  We love to have friends, family, and other pilots, to have a desire to <b>FLY SOMEWHERE!  ANYWHERE!</b> So that we can justify buying some fuel and planning the flight.  <br/><br/> <i>It’s FUN!</i>`,

  `Pilots that are  regularly flying become more skilled and add to their own skills. They become safer pilots through the experiences they have in flying.  This is the reason a Private Pilot Certificate is known as a “License to Learn” and we want to encourage that behavior by providing known-good destinations for you to fly to, based on some simple criteria you enter.`,

  `Think of Fly2Find as a reason to put fuel in the tanks, check the weather and to get into the air… <b>RIGHT NOW!</b>`,

  `Fly2find calls this a <b class='text-primary2'>Jaunt</b>.`
];

const section2Texts = [
  `When you become a member you are putting yourself in a position to <b>KNOW</b> where you are going to fly today.  No wasted time trying to figure out where to go and what to do!`,
  `This service combines the best flight destinations based on how you like to fly, and what you fly. Each Jaunt you receive will give you 3 basic things upfront:`,
  `<ul>${['A place to fly', 'An action to take or trinket to find', 'And a special code']
    .map(t => `<li>${t}</li>`)
    .join('')}</ul>`,
  `For those competing for the prizes and promotions, you will additionally have a time-range to accomplish your jaunt.  Those not competing can fly their next Jaunt whenever their schedule and the weather allows.`
];

const LandingPage = () => {
  const onLearnMoreClick = () => {
    const section = document.getElementById('joinUsSection');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <Container fluid>
      <Header
        headerTitle="Where can we fly today?"
        headerSubtitle="That question burning in the heart of every Aviator is the reason this system was created.
"
        onLearnMoreClick={onLearnMoreClick}
      />
      <Section id="section1" texts={section1Texts} />
      <Section texts={section2Texts} flip />
      <Title title="Join us Now!" />
      <JoinUs />
    </Container>
  );
};

export default LandingPage;

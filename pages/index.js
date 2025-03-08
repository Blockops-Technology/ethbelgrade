import Head from "next/head";
import mainLayout from "../components/common/layout/mainLayout";
import Hero from "../components/landing/hero/hero";
import About from "../components/landing/about/about";
import MediaPartners from "../components/landing/media-partners/mediaPartners";
import Newsletter from "../components/landing/newsletter/newsletter";
import Hackathon from "../components/landing/hackathon/hackathon";
import Quote from "../components/landing/quote/quote";
import Speakers from "../components/landing/speakers/speakers";
import Partners from "../components/landing/partners/partners";
import Venue from "../components/landing/venue/venue";
import Startups from "../components/landing/startups/startups";
import Agenda from "../components/landing/agenda/agenda";

import { DATE, YEAR } from "../constants";
export default function Home() {
  const description = `The most welcoming ETH event in the heart of the Balkans. Part of Belgrade Blockchain Week.${DATE} ${YEAR} - see you in Belgrade!`;
  return (
    <div style={{ overflow: "hidden" }}>
      <Head>
        <title>ETH Belgrade</title>
        <meta name="description" content={description} />

        <meta property="og:title" content="ETH Belgrade" />
        <meta property="og:description" content={description} />

        {/*TODO:*/}
        <meta property="og:image" content="https://ethbelgrade.rs/eth-belgrade-og-2025.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ETH Belgrade" />
        <meta name="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@ethbelgrade" />
        {/*TODO:*/}
        <meta name="twitter:image" content="https://ethbelgrade.rs/eth-belgrade-og-2025.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      {/*<Agenda />*/}
      <About />
      <Speakers />
      <Partners />
      <Hackathon />
      <Startups />
      {/*<MediaPartners />*/}
      {/*<Quote />*/}
      <Newsletter />
      {/*<Venue />*/}
    </div>
  )
}

Home.getLayout = mainLayout;

import Head from "next/head";
import mainLayout from "../../components/common/layout/mainLayout";
import Hero from "../../components/hackathon/hero/hero";
import About from "../../components/hackathon/about/about";
import MentorsAndJudges from "../../components/hackathon/mentors-and-judges/mentorsAndJudges";
import Sponsors from "../../components/hackathon/sponsors/sponsors";
import Prizes from "../../components/hackathon/prizes/prizes";
import Agenda from "../../components/hackathon/agenda/agenda";
import AboutDevconScholarships from "../../components/hackathon/aboutDevconScholarships/aboutDevconScholarships";

export default function Hackathon() {
  const description = "ETH Belgrade Hackathon offers a three-day hacking experience with a primary focus on building on Ethereum. We're opening the doors for builders from all around the globe to join us both in-person and online (hybrid).";
  return (
    <div>
      <Head>
        <title>ETH Belgrade Hackathon</title>
        <meta name="description" content={description} />

        <meta property="og:title" content="ETH Belgrade Hackathon"/>
        <meta property="og:description" content={description} />

        {/*TODO:*/}
        <meta property="og:image" content="https://ethbelgrade.rs/eth-belgrade-og-2025.jpg"/>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ETH Belgrade Hackathon" />
        <meta name="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@ethbelgrade" />
        {/*TODO:*/}
        <meta name="twitter:image" content="https://ethbelgrade.rs/eth-belgrade-og-2025.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      {/*<Prizes />*/}
      {/*<About />*/}
      {/*<AboutDevconScholarships />*/}
      {/*<Sponsors />*/}
      {/*<Prizes />*/}
      {/*<Agenda />*/}
    </div>
  )
}

Hackathon.getLayout = mainLayout;

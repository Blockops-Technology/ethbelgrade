import Head from "next/head";
import mainLayout from "../../components/common/layout/mainLayout";
import Hero from "../../components/hackathon/hero/hero";
import About from "../../components/hackathon/about/about";
import MentorsAndJudges from "../../components/hackathon/mentors-and-judges/mentorsAndJudges";
import Sponsors from "../../components/hackathon/sponsors/sponsors";
import Prizes from "../../components/hackathon/prizes/prizes";
import Timeline from "../../components/hackathon/timeline/timeline";

export default function Hackathon() {
  const description = "ETH Belgrade Hackathon (5-6 June 2023) is a two-day event that gathers Web3 talents from around the world to compete for bounties provided by our sponsors and partners and the main prize.";
  return (
    <div>
      <Head>
        <title>ETH Belgrade</title>
        <meta name="description" content={description} />

        <meta property="og:title" content="ETH Belgrade Hackathon"/>
        <meta property="og:description" content={description} />

        {/*TODO:*/}
        <meta property="og:image" content="https://ethbelgrade.rs/eth-blegrade-og.jpg"/>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ETH Belgrade Hackathon" />
        <meta name="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@ethbelgrade" />
        {/*TODO:*/}
        <meta name="twitter:image" content="https://ethbelgrade.rs/eth-blegrade-og.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <About />
      <MentorsAndJudges />
      <Sponsors />
      <Prizes />
      <Timeline />
    </div>
  )
}

Hackathon.getLayout = mainLayout;

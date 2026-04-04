import getSpeakers from "@/lib/getSpeakers";
import getSponsors from "@/lib/getSponsors";
import getDataSource from "@/lib/getDataSource";

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
export default function Home({
  speakers = [],
  sponsors = [],
  speakersError = null,
  sponsorsError = null,
  fromDb = false,
}) {
  const description = `The premier Ethereum event in the heart of the Balkans. Part of Belgrade Blockchain Week. ${DATE} ${YEAR} - see you in Belgrade!`;
  return (
    <div style={{ overflow: "hidden" }}>
      <Head>
        <title>ETH Belgrade</title>
        <meta name="description" content={description} />

        <meta property="og:title" content="ETH Belgrade [4]" />
        <meta property="og:description" content={description} />

        {/*TODO:*/}
        <meta property="og:image" content="https://ethbelgrade.rs/eth-belgrade-og-2026.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ETH Belgrade [4]" />
        <meta name="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@ethbelgrade" />
        {/*TODO:*/}
        <meta name="twitter:image" content="https://ethbelgrade.rs/eth-belgrade-og-2026.jpg" />

        <link rel="icon" href="/favicon.ico" />
        {fromDb && <meta name="data-source" content="database" />}
      </Head>
      <Hero />
      <About />
      {speakersError ? (
        <div className="container" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
          <h2 style={{ color: "var(--primary-red)", marginBottom: "12px" }}>Speakers unavailable</h2>
          <p>{speakersError}</p>
        </div>
      ) : (
        <Speakers speakers={speakers} />
      )}
      {sponsorsError ? (
        <div className="container" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
          <h2 style={{ color: "var(--primary-red)", marginBottom: "12px" }}>Sponsors unavailable</h2>
          <p>{sponsorsError}</p>
        </div>
      ) : (
        <Partners sponsors={sponsors} />
      )}
      {/* <Hackathon /> */}
      <Startups />
      {/* <MediaPartners /> */}
      {/*<Quote />*/}
      {/* <Newsletter /> */}
      <Venue />
    </div>
  )
}

Home.getLayout = mainLayout;

export const getStaticProps = async () => {
  const source = await getDataSource();

  const [speakersResult, sponsorsResult] = await Promise.allSettled([
    getSpeakers(source),
    getSponsors(source),
  ]);

  return {
    props: {
      speakers: speakersResult.status === "fulfilled" ? speakersResult.value : [],
      sponsors: sponsorsResult.status === "fulfilled" ? sponsorsResult.value : [],
      speakersError:
        speakersResult.status === "rejected" ? speakersResult.reason.message : null,
      sponsorsError:
        sponsorsResult.status === "rejected" ? sponsorsResult.reason.message : null,
      fromDb: source === "db",
    },
    revalidate: 60,
  };
};

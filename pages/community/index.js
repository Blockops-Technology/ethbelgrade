import Head from "next/head";
import mainLayout from "../../components/common/layout/mainLayout";
import Hero from "../../components/community/hero/hero";
import Sponsors from "../../components/community/sponsors/sponsors";
import CommunityEvents from "../../components/community/communityEvents/communityEvents";
import About from "../../components/community/about/about";

export default function Community() {
  const description = "The premier ETH event in the heart of the Balkans. Part of Belgrade Blockchain Week. 2-4 June 2023 - see you in Belgrade!";
  return (
    <div>
      <Head>
        <title>ETH Belgrade Community</title>
        <meta name="description" content={description} />

        <meta property="og:title" content="ETH Belgrade Community"/>
        <meta property="og:description" content={description} />

        {/*TODO:*/}
        <meta property="og:image" content="https://ethbelgrade.rs/eth-blegrade-og.jpg"/>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ETH Belgrade Community" />
        <meta name="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@ethbelgrade" />
        {/*TODO:*/}
        <meta name="twitter:image" content="https://ethbelgrade.rs/eth-blegrade-og.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <About />
      <Sponsors />
      <CommunityEvents />
    </div>
  )
}

Community.getLayout = mainLayout;
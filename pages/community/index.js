import Head from "next/head";
import mainLayout from "../../components/common/layout/mainLayout";
import Hero from "../../components/community/hero/hero";
import Sponsors from "../../components/community/sponsors/sponsors";
import CommunityEvents from "../../components/community/communityEvents/communityEvents";
import About from "../../components/community/about/about";

export default function Community() {
  const description = "ETH Belgrade Community is a natural extension of the ETH Belgrade conference. ETH Belgrade organize various high-quality events (meetups, build & chill gatherings, etc.) throughout the year.";
  return (
    <div>
      <Head>
        <title>ETH Belgrade Community</title>
        <meta name="description" content={description} />

        <meta property="og:title" content="ETH Belgrade Community"/>
        <meta property="og:description" content={description} />

        {/*TODO:*/}
        <meta property="og:image" content="https://ethbelgrade.rs/images/community/eth-blegrade-community-og.jpg"/>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ETH Belgrade Community" />
        <meta name="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@ethbelgrade" />
        {/*TODO:*/}
        <meta name="twitter:image" content="https://ethbelgrade.rs/images/community/eth-blegrade-community-og.jpg" />

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
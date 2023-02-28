import Head from "next/head";
import mainLayout from "../components/common/layout/mainLayout";
import Hero from "../components/landing/hero/hero";
import About from "../components/landing/about/about";
import MediaPartners from "../components/landing/media-partners/mediaPartners";
import Newsletter from "../components/landing/newsletter/newsletter";
import Hackathon from "../components/landing/hackathon/hackathon";
import Quote from "../components/landing/quote/quote";

export default function Home() {
  const description = "The premier ETH event in the heart of the Balkans. Part of Belgrade Blockchain Week. 2-4 June 2023 - see you in Belgrade!";
  return (
    <div>
      <Head>
        <title>ETH Belgrade</title>
        <meta name="description" content={description} />

        <meta property="og:title" content="ETH Belgrade"/>
        <meta property="og:description" content={description} />

        {/*TODO:*/}
        <meta property="og:image" content="https://ethbelgrade.rs/eth-blegrade-og.jpg"/>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ETH Belgrade" />
        <meta name="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@ethbelgrade" />
        {/*TODO:*/}
        <meta name="twitter:image" content="https://ethbelgrade.rs/eth-blegrade-og.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <About />
      <MediaPartners />
      <Quote />
      <Newsletter />
      <Hackathon />
    </div>
  )
}

Home.getLayout = mainLayout;

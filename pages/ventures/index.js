import Head from "next/head";
import mainLayout from "../../components/common/layout/mainLayout";
import Hero from "../../components/ventures/hero/hero";
import About from "../../components/ventures/about/about";
import Partners from "../../components/ventures/partners/partners";


export default function Hackathon() {
  const description = "ETH Belgrade Ventures is a platform for startups and entrepreneurs to connect with investors, mentors, and other founders. We're here to help you grow your business and take it to the next level."
  return (
    <div>
      <Head>
        <title>ETH Belgrade Ventures</title>
        <meta name="description" content={description} />

        <meta property="og:title" content="ETH Belgrade Ventures"/>
        <meta property="og:description" content={description} />

        {/*TODO:*/}
        <meta property="og:image" content="https://ethbelgrade.rs/eth-belgrade-og-2025.jpg"/>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ETH Belgrade Ventures" />
        <meta name="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@ethbelgrade" />
        {/*TODO:*/}
        <meta name="twitter:image" content="https://ethbelgrade.rs/eth-belgrade-og-2025.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <About />
      <Partners />
    </div>
  )
}

Hackathon.getLayout = mainLayout;

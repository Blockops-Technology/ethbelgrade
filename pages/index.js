import Head from "next/head";
import { Roboto_Mono } from "@next/font/google";
import mainLayout from "../components/common/layout/mainLayout";

const robotoMono = Roboto_Mono({
  subsets: ["latin"]
});

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
      <div>
        <p>Content goes here</p>
      </div>
    </div>
  )
}

Home.getLayout = mainLayout;

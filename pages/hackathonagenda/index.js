import Head from "next/head";
import mainLayout from "../../components/common/layout/mainLayout";
import HackathonAgenda from "../../components/landing/hackathonagenda/hackathonagenda";


export default function HackathonAgendaPage() {
  const description = "ETH Belgrade Hackathon offers a three-day hacking experience with a primary focus on building on Ethereum. We're opening the doors for builders from all around the globe to join us both in-person and online (hybrid).";
  return (
    <div>
      <Head>
        <title>ETH Belgrade</title>
        <meta name="description" content={description} />

        <meta property="og:title" content="ETH Belgrade Hackathon"/>
        <meta property="og:description" content={description} />

        {/*TODO:*/}
        <meta property="og:image" content="https://ethbelgrade.rs/eth-belgrade-og3.jpg"/>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ETH Belgrade Hackathon" />
        <meta name="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@ethbelgrade" />
        {/*TODO:*/}
        <meta name="twitter:image" content="https://ethbelgrade.rs/eth-belgrade-og3.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HackathonAgenda />
    </div>
  )
}

HackathonAgendaPage.getLayout = mainLayout;

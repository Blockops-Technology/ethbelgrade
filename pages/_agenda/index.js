import getAgenda from "@/lib/getAgenda";
import Head from "next/head";
import mainLayout from "../../components/common/layout/mainLayout";
import Agenda from "../../components/landing/agenda/agenda";


export default function AgendaPage({ agenda, agendaError = null }) {
  const description = "ETH Belgrade Hackathon offers a three-day hacking experience with a primary focus on building on Ethereum. We're opening the doors for builders from all around the globe to join us both in-person and online (hybrid).";
  return (
    <div>
      <Head>
        <title>ETH Belgrade</title>
        <meta name="description" content={description} />

        <meta property="og:title" content="ETH Belgrade Hackathon"/>
        <meta property="og:description" content={description} />

        {/*TODO:*/}
        <meta property="og:image" content="https://ethbelgrade.rs/eth-belgrade-og-2026.jpg"/>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ETH Belgrade Hackathon" />
        <meta name="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@ethbelgrade" />
        {/*TODO:*/}
        <meta name="twitter:image" content="https://ethbelgrade.rs/eth-belgrade-og-2026.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      {agendaError ? (
        <div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <h1 style={{ color: "var(--primary-red)", marginBottom: "16px" }}>Agenda unavailable</h1>
          <p>{agendaError}</p>
        </div>
      ) : (
        <Agenda agendaData={agenda} />
      )}
    </div>
  )
}

AgendaPage.getLayout = mainLayout;

export const getStaticProps = async () => {
  try {
    const agenda = await getAgenda();

    return {
      props: { agenda, agendaError: null },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        agenda: null,
        agendaError: error.message || "Failed to load agenda.",
      },
      revalidate: 60,
    };
  }
};

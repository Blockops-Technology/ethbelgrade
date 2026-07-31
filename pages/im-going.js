import Head from "next/head";

import mainLayout from "../components/common/layout/mainLayout";
import ImGoing from "../components/im-going/imGoing";
import { DATE, YEAR } from "../constants";

export default function ImGoingPage() {
  const title = "I'm going to ETH Belgrade";
  const description = `Create your personalized "I'm going to ETH Belgrade" card and share it on X and LinkedIn. ${DATE} ${YEAR}, Sava Centar — see you in Belgrade!`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://ethbelgrade.rs/eth-belgrade-og-2026.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:site" content="@ethbelgrade" />
        <meta name="twitter:image" content="https://ethbelgrade.rs/eth-belgrade-og-2026.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ImGoing />
    </>
  );
}

ImGoingPage.getLayout = mainLayout;

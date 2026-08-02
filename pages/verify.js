import Head from "next/head";

import mainLayout from "../components/common/layout/mainLayout";
import Verify from "../components/verify/verify";

// getStaticProps keeps the data file server-side: only the public org channels
// are serialized into the page — the client bundle never sees the JSON.
export async function getStaticProps() {
  const verifiedChannels = (await import("../components/verify/verified-channels.json")).default;
  return {
    props: {
      publicChannels: verifiedChannels.channels.filter((channel) => channel.handle),
    },
  };
}

export default function VerifyPage({ publicChannels }) {
  const title = "ETH Belgrade Channel Verification";
  const description = "Protect yourself from fraud. Check whether an email address, phone number, Telegram handle, or X account officially belongs to the ETH Belgrade team.";

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
      <Verify publicChannels={publicChannels} />
    </>
  );
}

VerifyPage.getLayout = mainLayout;

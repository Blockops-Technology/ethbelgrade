import styles from "./partners.module.scss";
import Button from "../../common/button/button";
import { SPONSOR_APPLICATION_FORM_URL, YEAR } from "../../../constants";

const partners = [
  { href: "https://polarisfinance.io/", img: "/images/partners/polaris.svg", alt: "Polaris logo" },
  { href: "https://tenderly.co/", img: "/images/partners/tenderly.svg", alt: "Tenderly logo" },
  { href: "https://defisaver.com/", img: "/images/partners/defi-saver.png", alt: "DeFi Saver logo" },
  { href: "https://geodework.com/", img: "/images/partners/geodework.svg", alt: "Geodework logo" },
  { href: "https://www.decenter.com/", img: "/images/partners/decenter.svg", alt: "Decenter logo" },
  { href: "https://www.ambire.com/", img: "/images/partners/ambire.svg", alt: "Ambire logo" },
  // { href: "https://esp.ethereum.foundation/", img: "/images/partners/EF-ESP-logo.svg", alt: "Ethereum Foundation Ecosystem Support Program logo" },
  // { href: "https://polkadot.com/", img: "/images/partners/polkadot.svg", alt: "Polkadot logo" },
  // { href: "https://www.vidikovac.space/", img: "/images/partners/vidikovac.svg", alt: "Vidikovac logo" },
  // { href: "https://chain.link/", img: "/images/partners/chainlink-logo.svg", alt: "Chainlink logo" },
  // { href: "https://metamask.io/", img: "/images/partners/metamask-logo.svg", alt: "MetaMask logo" },
  // { href: "https://ledger.com/", img: "/images/partners/ledger-logo.svg", alt: "Ledger logo" },
  // { href: "https://lido.fi/", img: "/images/partners/lido-logo.svg", alt: "Lido logo" },
  // { href: "https://li.fi/", img: "/images/partners/lifi-logo.svg", alt: "LiFi logo" },
  // { href: "https://www.bnbchain.org/en", img: "/images/partners/bnb-chain-logo.svg", alt: "BNB Chain logo" },
  // { href: "https://linea.build/", img: "/images/partners/linea-logo.svg", alt: "Linea logo" },
  // { href: "https://neonevm.org/", img: "/images/partners/NeonEVM-logo.svg", alt: "Neon EVM logo" },
  // { href: "https://oasis.net/", img: "/images/partners/oasis-logo.svg", alt: "Oasis logo" },
  // { href: "https://www.liquity.org/", img: "/images/partners/liquity-logo-white2.svg", alt: "Liquity logo" },
  // { href: "https://www.rareskills.io/", img: "/images/partners/rareskills-logo-dark.svg", alt: "RareSkills logo" },
  // { href: "https://citrea.xyz/", img: "/images/partners/citrea.svg", alt: "Citrea logo" },
  // { href: "https://origintrail.io/", img: "/images/partners/origin-trail.svg", alt: "Origin Trail logo" },
  // { href: "https://www.optimism.io/", img: "/images/partners/optimism.svg", alt: "Optimism logo" },
  // { href: "https://www.mantle.xyz/", img: "/images/partners/mantle-logo.svg", alt: "Mantle logo" },
  // { href: "https://www.risczero.com/", img: "/images/partners/risc-zero-logo.png", alt: "RISC Zero logo" },
  // { href: "https://www.blockscout.com/", img: "/images/partners/blockscout-logo.svg", alt: "Blockscout logo" },
  // { href: "https://ethernal.tech/", img: "/images/partners/ethernal-logo-white.svg", alt: "Ethernal logo" },
  // { href: "https://cosmoverse.org/", img: "/images/partners/cosmoverse-vertical.png", alt: "Cosmoverse 2025 logo" },
  // { href: "https://sidechain.pro/", img: "/images/partners/sidechain-logo.svg", alt: "Sidechain logo" },
  // { href: "https://perpflow.xyz/", img: "/images/partners/perpflow-logo.svg", alt: "Perpflow logo" },
  // { href: "https://www.txfusion.io/", img: "/images/partners/tx-fusion.svg", alt: "txFusion logo" },
  // { href: "https://www.spaceshard.io/", img: "/images/partners/spaceshard.png", alt: "Space Shard logo" },
  // { href: "https://poap.xyz/", img: "/images/partners/poap.svg", alt: "POAP logo" },
  // { href: "https://www.iex.ec/", img: "/images/partners/iexec-logo.svg", alt: "iExec logo" },
  // { href: "https://flare.network/", img: "/images/partners/flare-logo.png", alt: "Flare logo" },
  // { href: "https://xsolla.com/zk", img: "/images/partners/xsolla-zk-logo.svg", alt: "Xsolla logo" },
  // { href: "https://quex.tech/", img: "/images/partners/quex2.png", alt: "Quex logo" },
  // { href: "https://www.civic.com/", img: "/images/partners/civic.svg", alt: "Civic logo" },
  // { href: "https://lisk.com/", img: "/images/partners/lisk.svg", alt: "Lisk logo" },
  // { href: "https://www.riseworks.io/", img: "/images/partners/rise-logo.png", alt: "Rise logo" },
  // { href: "https://crypto12.com/en/", img: "/images/partners/crypto12-logo.webp", alt: "Crypto12 logo" },
  // { href: "https://blockops.technology/", img: "/images/partners/blockops-logo.png", alt: "Blockops logo" },
  // { href: "https://unusualsour.com/", img: "/images/partners/Unusual-Sour-Logo.png", alt: "Unusual Sour logo" },
  // { href: "https://web3securitysummit.com/", img: "/images/partners/web3-sec-summit-logo-light.png", alt: "Web3 Security Summit logo" },
  // { href: "https://rustsummit.com/", img: "/images/partners/rust-summit-logo.svg", alt: "Rust Summit logo" },
  // { href: "https://blocksplit.net/", img: "/images/partners/BlockSplit_logo.png", alt: "BlockSplit logo" },
  // { href: "https://www.ethsofia.com/", img: "/images/partners/eth-sofia.png", alt: "ETH Sofia logo" },
  // { href: "https://www.ethaccra.xyz/", img: "/images/partners/eth-accra.png", alt: "ETH Accra logo" },
  // { href: "https://ethbratislava.com/", img: "/images/partners/eth-bratislava.webp", alt: "ETH Bratislava logo" },
  // { href: "https://www.ethbucharest.xyz/", img: "/images/partners/eth-bucharest-logo-white.svg", alt: "ETH Bucharest logo" },
  // { href: "https://ethrwanda.rw/", img: "/images/partners/eth-rwanda.png", alt: "ETH Rwanda logo" },
  // { href: "https://www.aliceinblockchains.io/", img: "/images/partners/AIB.png", alt: "Alice in Blockchain logo" },
  // { href: "https://www.ethbelgium.com/", img: "/images/partners/eth-belgium.png", alt: "ETH Belgium logo" },
  // { href: "https://www.ethcluj.org/", img: "/images/partners/ethcluj.png", alt: "ETH Cluj logo" },
];

const Partners = () => (
  <div id="partners">
    <div className={styles.pageTitleContainer}>
      <div className={styles.pageTitleWrapper}>
        <p className={styles.pageTitle}>Sponsors</p>
        {/* <p className={styles.pageSubtitle}></p> */}
      </div>

    </div>
    <div className="container">
      <p className={styles.title}>They&apos;ve helped us BIG TIME!</p>
      <p className={styles.subtitle}>Shout out to key industry players for supporting ETH Belgrade 2026!</p>

      <div className={styles.grid}>
        {partners.map((partner) => (
          <a
            key={partner.href}
            className={styles.gridCell}
            href={partner.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={partner.img} alt={partner.alt} />
          </a>
        ))}
      </div>

      <div className={styles.ctaSection}>
        <p className={styles.ctaTitle}>Consider becoming a <span>sponsor</span>?</p>
        <div className={styles.buttonWrapper}>
          <a href={SPONSOR_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button className={styles.button} styleType="red">Get in touch</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Partners;

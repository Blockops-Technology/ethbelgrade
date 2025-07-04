import styles from "./partners.module.scss";
import Button from "../../common/button/button";
import { SPONSOR_APPLICATION_FORM_URL, YEAR } from "../../../constants";

const Partners = () => (
  <div id="partners">
    <div className={styles.pageTitleContainer}>
      <p className={styles.pageTitle}>Sponsors</p>
    </div>
    <div className="container">
      <p className={styles.title}>They’ve helped us BIG TIME!</p>
      <p className={styles.subtitle}>Shout out to key industry players for supporting ETH Belgrade {YEAR}!</p>

      <div>
        <p className={styles.tier}>Community Legends</p>
        <div className={styles.superSponsorsList}>
          <a href="https://tenderly.co/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/tenderly.svg" alt="Tenderly logo" />
          </a>
          <a href="https://defisaver.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/defi-saver.png" alt="DeFi Saver logo" />
          </a>
          {/* <a style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "center" }} href="https://www.johnlilic.info/" target="_blank" rel="noreferrer noopener">
            <img className="!w-auto" src="/images/partners/johnlilic.jpg" alt="John Lilic logo" />
            <p style={{ fontWeight: "bold", fontSize: 20, textTransform: "uppercase" }}>John Lilic</p>
          </a> */}
          {/* <a href="https://www.telos.net/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/telos.svg" alt="Telos logo" />
          </a> */}
        </div>


        <p className={styles.tier}>Community Builders</p>
        <div className={styles.sponsorsList}>
          <a href="https://esp.ethereum.foundation/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/EF-ESP-logo.svg" alt="Ethereum Foundation Ecosystem Support Program logo" />
          </a>
          <a href="https://geodework.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/geodework.svg" alt="Geodework logo" />
          </a>
          <a href="https://www.vidikovac.space/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/vidikovac.svg" alt="Vidikovac logo" />
          </a>
          {/* <a href="https://blockanalitica.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/BlockAnalitica-logo.png" alt="Block Analitica logo" />
          </a>
          <a href="https://www.superchain.network/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/superchain-logo.png" alt="Superchain logo" />
          </a>
          <a href="https://www.bnbchain.org/en" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/bnb-chain-logo.svg" alt="BNB Chain logo" />
          </a>
          <a href="https://www.mantle.xyz/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/mantle-logo.svg" alt="Mantle logo" />
          </a> */}
        </div>

        <p className={styles.tier}>Community Gardeners</p>
        <div className={styles.sponsorsList}>
          {/* <a href="https://www.optimism.io/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/optimism.svg" alt="Optimism logo" />
          </a>
          <a href="https://linea.build/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/linea-logo.svg" alt="Linea logo" />
          </a> */}
          <a href="https://lido.fi/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/lido-logo.svg" alt="Lido logo" />
          </a>
          <a href="https://li.fi/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/lifi-logo.svg" alt="LiFi logo" />
          </a>
          {/* <a href="https://oasisprotocol.org/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/oasis-logo.svg" alt="Oasis logo" />
          </a>
          <a href="https://www.blockscout.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/blockscout-logo.svg" alt="Blockscout logo" />
          </a> */}
          <a href="https://www.rareskills.io/" target="_blank" rel="noreferrer noopener">
            <img className="!w-full" src="/images/partners/rareskills-logo-dark.svg" alt="RareSkills logo" />
          </a>
          <a href="https://ethernal.tech/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/ethernal-logo-white.svg" alt="Ethernal logo" />
          </a>
          <a href="https://cosmoverse.org/" target="_blank" rel="noreferrer noopener">
            <img className="!max-h-[70px]" src="/images/partners/cosmoverse-vertical.png" alt="Cosmoverse 2025 logo" />
          </a>
          <a href="https://sidechain.pro/" target="_blank" rel="noreferrer noopener">
            <img style={{ maxHeight: 90 }} src="/images/partners/sidechain-logo.svg" alt="Sidechain logo" />
          </a>
          <a href="https://perpflow.xyz/" target="_blank" rel="noreferrer noopener">
            <img className="" src="/images/partners/perpflow-logo.svg" alt="Perpflow logo" />
          </a>
        </div>

        <p className={styles.tier}>Community supporter</p>
        <div className={styles.sponsorsList}>
          <a href="https://www.liquity.org/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/liquity-logo-white2.svg" alt="Liquity logo" />
          </a>
          <a href="https://citrea.xyz/" target="_blank" rel="noreferrer noopener">
            <img className="w-full" src="/images/partners/citrea.svg" alt="Citrea logo" />
          </a>
          <a href="https://www.txfusion.io/" target="_blank" rel="noreferrer noopener">
            <img className="w-full" src="/images/partners/tx-fusion.svg" alt="txFusion logo" />
          </a>
          <a href="https://www.spaceshard.io/" target="_blank" rel="noreferrer noopener">
            <img className="w-full" src="/images/partners/spaceshard.png" alt="Space Shard logo" />
          </a>
          <a href="https://poap.xyz//" target="_blank" rel="noreferrer noopener">
            <img className="!max-h-[70px] w-full" src="/images/partners/poap.svg" alt="POAP logo" />
          </a>
        </div>

        <p className={styles.tier}>Hackathon sponsors</p>
        <div className={styles.sponsorsList}>
          <a href="https://chain.link/" target="_blank" rel="noreferrer noopener">
            <img className="!w-full" src="/images/partners/chainlink-logo.svg" alt="Chainlink logo" />
          </a>
          <a href="https://polkadot.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/polkadot.svg" alt="Polkadot logo" />
          </a>
          <a href="https://www.iex.ec/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/iexec-logo.svg" alt="iExec logo" />
          </a>
          <a href="https://flare.network/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/flare-logo.png" alt="Flare logo" />
          </a>
          <a href="https://oasis.net/" target="_blank" rel="noreferrer noopener">
            <img className="!w-full" src="/images/partners/oasis-logo.svg" alt="Oasis logo" />
          </a>
          <a href="https://xsolla.com/zk" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/xsolla-zk-logo.svg" alt="Xsolla logo" />
          </a>
          <a href="https://quex.tech/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/quex2.png" alt="Quex logo" />
          </a>
          <a href="https://neonevm.org/" target="_blank" rel="noreferrer noopener">
            <img className="w-full" src="/images/partners/NeonEVM-logo.svg" alt="Neon EVM logo" />
          </a>
          <a href="https://ledger.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/ledger-logo.svg" alt="Ledger logo" />
          </a>
          <a href="https://origintrail.io/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/origin-trail.svg" alt="Origin Trail logo" />
          </a>
          <a href="https://www.civic.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/civic.svg" alt="Civic logo" />
          </a>
          <a href="https://lisk.com/" target="_blank" rel="noreferrer noopener">
            <img className="w-full" src="/images/partners/lisk.svg" alt="Lisk logo" />
          </a>
          {/* <a href="https://buidlguidl.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/buidlguidl-logo.svg" alt="BuidlGuidl logo" />
          </a> */}
        </div>


        <p className={styles.tier}>ETH Belgrade Venutres Startup Programme sponsor</p>
        <div className={styles.sponsorsList}>
          <a href="https://www.riseworks.io/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/rise-logo.png" alt="Rise logo" />
          </a>
        </div>

        <p className={styles.tier}>Coffee sponsor</p>
        <div className={styles.sponsorsList}>
          <a href="https://crypto12.com/en/" target="_blank" rel="noreferrer noopener">
            <img style={{ maxHeight: 90 }} src="/images/partners/crypto12-logo.webp" alt="Crypto12 logo" />
          </a>
        </div>

        <p className={styles.tier}>Supported by</p>
        <div className={styles.sponsorsList}>
          <a href="https://blockops.technology/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/blockops-logo.png" alt="Blockops logo" />
          </a>
          <a href="https://unusualsour.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/Unusual-Sour-Logo.png" alt="Unusual Sour logo" />
          </a>
          <a href="https://www.decenter.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/decenter.svg" alt="Decenter logo" />
          </a>
        </div>

        <p className={styles.tier}>Partners</p>
        <div className={styles.sponsorsList}>
          <a href="https://web3securitysummit.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/web3-sec-summit-logo-light.png" alt="Web3 Security Summit logo" />
          </a>
          <a href="https://rustsummit.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/rust-summit-logo.svg" alt="Rust Summit logo" />
          </a>
          <a href="https://blocksplit.net/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/BlockSplit_logo.png" alt="BlockSplit logo" />
          </a>
          <a href="https://www.ethsofia.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/eth-sofia.png" alt="ETH Sofia logo" />
          </a>
          <a href="https://www.ethaccra.xyz/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/eth-accra.png" alt="ETH Accra logo" />
          </a>
          <a href="https://ethbratislava.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/eth-bratislava.webp" alt="ETH Bratislava logo" />
          </a>
          <a href="https://www.ethbucharest.xyz/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/eth-bucharest-logo-white.svg" alt="ETH Bucharest logo" />
          </a>
          <a href="https://ethrwanda.rw/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/eth-rwanda.png" alt="ETH Rwanda logo" />
          </a>
          <a href="https://www.aliceinblockchains.io/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/AIB.png" alt="Alice in Blockchain logo" />
          </a>
          <a href="https://www.ethbelgium.com/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/eth-belgium.png" alt="ETH Belgium logo" />
          </a>
          <a href="https://www.ethcluj.org/" target="_blank" rel="noreferrer noopener">
            <img src="/images/partners/ethcluj.png" alt="ETH Cluj logo" />
          </a>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <p className={styles.ctaTitle}>Consider becoming a <span>sponsor</span>?</p>
        <div className={styles.buttonWrapper}>
          <a href={SPONSOR_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
            <Button className={styles.button} styleType="yellow">Get in touch</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Partners;
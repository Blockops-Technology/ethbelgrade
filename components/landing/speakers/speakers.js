import Link from "next/link";

import styles from "./speakers.module.scss";
import Button from "../../common/button/button";

const Speakers = () => {
  return (
    <div id="speakers">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.text}>
            <p className={styles.title}>The brightest Web3 minds</p>
            <p className={styles.subtitle}>have something to say</p>
          </div>
          <div>
            <a href="https://forms.gle/Xf3wV3qp5Jq7oM1W9" target="_blank" rel="noreferrer noopener">
              <Button>Apply as a speaker</Button>
            </a>
          </div>
        </div>
        <div className={styles.speakerList}>
          <div className={styles.speaker}>
            <a href="https://twitter.com/abruzuc" target="_blank" rel="noreferrer noopener">
              <img src="/images/Speakers/Abril-zucchi%20-%20224x173.png" alt="Abru Zucchi photo" />
              <p className={styles.name}>Abril Zucchi</p>
              <p className={styles.position}>DevRel, Fleek</p>
            </a>
          </div>
          <div className={styles.speaker}>
            <a href="https://twitter.com/NPalinkasevic" target="_blank" rel="noreferrer noopener">
              <img src="/images/Speakers/nenad-palinkasevic%20-%20224x173.png" alt="Nenad Palikasevic photo" />
              <p className={styles.name}>Nenad Palikasevic</p>
              <p className={styles.position}>CEO & Co-Founder, DeFi Saver</p>
            </a>
          </div>
          <div className={styles.speaker}>
            <a href="https://twitter.com/BogdanHabic" target="_blank" rel="noreferrer noopener">
              <img src="/images/Speakers/bogdan-habic%20-%20224x173.png" alt="Bogan Habic photo" />
              <p className={styles.name}>Bogdan Habic</p>
              <p className={styles.position}>CTO & Co-founder, Tenderly</p>
            </a>
          </div>
          <div className={styles.speaker}>
            <a href="https://twitter.com/andrej_dev" target="_blank" rel="noreferrer noopener">
              <img src="/images/Speakers/Andrej%20Rakic%20-%20224x173.png" alt="Andrej Rakic photo" />
              <p className={styles.name}>Andrej Rakic</p>
              <p className={styles.position}>Shadowy Super-Coder, Chainlink & MVPW</p>
            </a>
          </div>
          <div className={styles.speaker}>
              <img src="/images/Speakers/juan - 224x173.png" alt="Juan photo" />
              <p className={styles.name}>Juan</p>
              <p className={styles.position}>MakerDAO</p>
          </div>
          <div className={styles.speaker}>
            <a href="https://twitter.com/bitfalls" target="_blank" rel="noreferrer noopener">
              <img src="/images/Speakers/bruno-skvorc%20-%20224x173.png" alt="Bruno Skvorc photo" />
              <p className={styles.name}>Bruno Skvorc</p>
              <p className={styles.position}>Founder, RMRK</p>
            </a>
          </div>
          <div className={styles.speaker}>
            <a href="https://twitter.com/wukoje" target="_blank" rel="noreferrer noopener">
              <img src="/images/Speakers/vukoje%20-%20224x173.png" alt="Vukasin Vukoje photo" />
              <p className={styles.name}>Vukasin Vukoje</p>
              <p className={styles.position}>Founder, Alt Labs</p>
            </a>
          </div>
          <div className={styles.speaker}>
            <a href="https://twitter.com/vuksansan" target="_blank" rel="noreferrer noopener">
              <img src="/images/Speakers/vuksan%20-%20224x173.png" alt="Vuksan Simunovic photo" />
              <p className={styles.name}>Vuksan Simunovic</p>
              <p className={styles.position}>CEO & Co-Founder, Trapesys</p>
            </a>
          </div>
          <div className={styles.speaker}>
            <a href="https://twitter.com/0xMislav" target="_blank" rel="noreferrer noopener">
              <img src="/images/Speakers/mislav-javor%20-%20224x173.png" alt="Mislav Javor photo" />
              <p className={styles.name}>Mislav Javor</p>
              <p className={styles.position}>Founder & CEO, DEV3</p>
            </a>
          </div>
          <div className={styles.speaker}>
            <a href="https://twitter.com/rakitadragan" target="_blank" rel="noreferrer noopener">
              <img src="/images/Speakers/dragan-rakita%20-%20224x173.png" alt="Dragan Rakita photo" />
              <p className={styles.name}>Dragan Rakita</p>
              <p className={styles.position}>Ethereum Core Developer, Paradigm</p>
            </a>
          </div>
          <div className={styles.speaker}>
            <a href="https://twitter.com/BranaRakic" target="_blank" rel="noreferrer noopener">
              <img src="/images/Speakers/branimir-rakic%20-%20224x173.png" alt="Branimir Rakic photo" />
              <p className={styles.name}>Branimir Rakic</p>
              <p className={styles.position}>Founder & CTO, OriginTrail</p>
            </a>
          </div>
          <div className={styles.speaker}>
            <a href="https://twitter.com/malisapusonja" target="_blank" rel="noreferrer noopener">
              <img src="/images/Speakers/malisa-pusonja%20-%20224x173.png" alt="Malisa Pusonja photo" />
              <p className={styles.name}>Malisa Pusonja</p>
              <p className={styles.position}>CTO, MVP Workshop</p>
            </a>
          </div>
          <div className={styles.speaker}>
            <a href="https://twitter.com/AtanasovskiP" target="_blank" rel="noreferrer noopener">
              <img src="/images/petar.png" alt="Petar" />
              <p className={styles.name}>Petar Atanasovski</p>
              <p className={styles.position}>COO, MVP Workshop</p>
            </a>
          </div>
          <div className={styles.speaker}>
            <a href="https://twitter.com/veryhighlander" target="_blank" rel="noreferrer noopener">
              <img src="/images/Speakers/danijel%20-%20224x173.png" alt="Danijel Gornjakovic photo" />
              <p className={styles.name}>Danijel Gornjakovic</p>
              <p className={styles.position}>Founder, Thales</p>
            </a>
          </div>
          <div className={styles.speaker}>
            <a href="https://twitter.com/edisinovcic" target="_blank" rel="noreferrer noopener">
              <img src="/images/Speakers/edi-sinovcic%20-%20224x173.png" alt="Edi Sinovcic" />
              <p className={styles.name}>Edi Sinovcic</p>
              <p className={styles.position}>CEO, SpaceShard</p>
            </a>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          {/*<Link href="/speakers">*/}
          {/*  <Button ghost>View all speakers</Button>*/}
          {/*</Link>*/}
        </div>
      </div>
    </div>
  );
}

export default Speakers;
import styles from "./hero.module.scss";
import Navigation from "../../common/navigation/navigation";
import Button from "../../common/button/button";
import { SPEAKER_APPLICATION_FORM_URL, SPONSOR_APPLICATION_FORM_URL, TICKETING_PLATFORM_URL } from "../../../constants";

const Hero = () => (
  <div className={styles.hero}>
    <Navigation />
    <div className="container">
      <div className={styles.heroContent}>
        <div className={styles.heroMargin}>
          <div className={styles.title}>MOST WELCOMING CONFERENCE</div>
        </div>
        <div className={styles.subtitle}>
          <div>ETH event in the heart of the Balkans. </div>
          <div>Part of Belgrade Blockchain Week.</div>
        </div>
        <div className={styles.labelContainer}>
          <img className={styles.sticker} src="/images/hero-sticker.svg" alt="ETH Belgrade conference sticker" />
        </div>
      </div>

      {/*<div className={styles.videoPlaylistWrapper}>*/}
      {/*  <p>All talks from ETH Belgrade 2023:</p>*/}
      {/*  <iframe width="800" height="450"*/}
      {/*          src="https://www.youtube-nocookie.com/embed/videoseries?list=PLNRa-ajAcEWRfTRMEeYWGJbtk0RoVRMz7"*/}
      {/*          title="YouTube video player" frameBorder="0"*/}
      {/*          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
      {/*          allowFullScreen></iframe>*/}
      {/*  <p>See you next year!</p>*/}
      {/*</div>*/}


      <div className={styles.buttons}>
        <a href={SPONSOR_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
          <Button ghost>
            Become a sponsor
          </Button>
        </a>
        <a href={SPEAKER_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
          <Button ghost>
              Apply as a speaker
          </Button>
        </a>
        <a href={TICKETING_PLATFORM_URL} target="_blank" rel="noreferrer noopener">
          <Button>Get Tickets</Button>
        </a>
        {/*<a href="https://taikai.network/ethbelgrade/hackathons/hackathon-2023" target="_blank" rel="noreferrer noopener">*/}
        {/*  <Button ghost>*/}
        {/*    Apply to hack*/}
        {/*  </Button>*/}
        {/*</a>*/}
      </div>

      {/* Venue map */}
      {/*<div className={styles.mapWrapper}>*/}
      {/*  <a href="/images/GROUND.png">*/}
      {/*    <img src="/images/GROUND.png" alt="ground floor map" />*/}
      {/*  </a>*/}
      {/*  <a href="/images/UPPER.png">*/}
      {/*    <img src="/images/UPPER.png" alt="upper floor map" />*/}
      {/*  </a>*/}
      {/*</div>*/}
    </div>
  </div>
);

export default Hero;

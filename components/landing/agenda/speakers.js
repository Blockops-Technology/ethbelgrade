import Link from "next/link";

const Speakers = ({speakers}) => {
  return speakers.map((speaker, i) => {
      const comma = i > 0 ? ", " : "";
      if (speaker.meta.en.twitter) {
        return <>{comma}<Link href={speaker.meta.en.twitter} target="_blank" rel="noreferrer noopener">{speaker.meta.en.title}</Link></>;
      } else {
        return <>{comma}{speaker.meta.en.title}</>;
      }
    });
}

export default Speakers
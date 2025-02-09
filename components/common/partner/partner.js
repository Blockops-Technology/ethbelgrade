import { bcms } from "../../../bcms";
import { BCMSImage } from "@thebcms/components-react";

const Partner = ({url, logo}) => (
    <a href={url} target="_blank" rel="noreferrer noopener">
    <BCMSImage
      media={logo}
      clientConfig={bcms.getConfig()}
    />
  </a>
);

export default Partner;
const DEFAULT_IMAGE_CONTENT_TYPE = "image/jpeg";

export const parseImageData = (image) => {
  if (!image || typeof image !== "string") {
    return null;
  }

  const dataUriMatch = image.match(/^data:(.+?);base64,(.+)$/);

  if (dataUriMatch) {
    return {
      contentType: dataUriMatch[1],
      buffer: Buffer.from(dataUriMatch[2], "base64"),
    };
  }

  const sanitized = image.replace(/\s/g, "");

  if (!sanitized) {
    return null;
  }

  return {
    contentType: DEFAULT_IMAGE_CONTENT_TYPE,
    buffer: Buffer.from(sanitized, "base64"),
  };
};

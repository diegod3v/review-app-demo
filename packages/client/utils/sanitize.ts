const isValidUrl = (url) => /^(http|https):\/\/[^ "]+$/.test(url);

export function sanitizeUrl(url: string) {
  let finalUrl = url;
  if (!url.startsWith("http") && !url.startsWith("https")) {
    finalUrl = `https://${url}`;
  }

  return isValidUrl(finalUrl) ? finalUrl : undefined;
}

export const getQueryParamsFromURL = (url: string) => {
  if (!url) return null;
  const search = url.split("?")[1];
  if (!search) return {};
  const paramsObj = Object.fromEntries(new URLSearchParams(search));
  return Object.keys(paramsObj) ? paramsObj : null;
};

export const getSearchURL = (name: string) =>
  `https://clinicaltrialskorea.com/studies?conditions=${encodeURI(name)}`;

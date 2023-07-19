export const setSession = (keyWord) => {
  if (!keyWord) return;

  const recentBox = sessionStorage.getItem("recentlyKeywords");
  let newSessionRecentBox;

  if (!recentBox) {
    newSessionRecentBox = [keyWord];
  } else {
    const parsedRecentBox = JSON.parse(recentBox);
    if (!parsedRecentBox.includes(keyWord)) {
      newSessionRecentBox = parsedRecentBox.concat(keyWord);
    } else {
      newSessionRecentBox = parsedRecentBox;
    }
  }

  sessionStorage.setItem(
    "recentlyKeywords",
    JSON.stringify(newSessionRecentBox)
  );
};

export const getSession = () => {
  const recentBox = sessionStorage.getItem("recentlyKeywords");
  if (!recentBox) return [];
  const sessionRecentBox = JSON.parse(recentBox);
  if (sessionRecentBox) return sessionRecentBox;
  if (recentBox === []) return [];
};

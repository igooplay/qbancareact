export const setDefaultLanguage = () => {
  const lan = "br";
  localStorage.setItem("language-setting", JSON.stringify(lan));
};

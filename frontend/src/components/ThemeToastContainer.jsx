import { ToastContainer } from "react-toastify";
import { useTheme } from "next-themes";

const ThemeToastContainer = () => {
  const { theme, systemTheme } = useTheme();

  const currentTheme =
    theme === "system" ? systemTheme : theme;

  return (
    <ToastContainer
      theme={currentTheme === "dark" ? "dark" : "light"}
      position="top-right"
      autoClose={3000}
      newestOnTop
      closeOnClick
      pauseOnHover
    />
  );
};

export default ThemeToastContainer;

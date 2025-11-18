import { Route, Routes } from "react-router-dom";
import { LayoutProvider } from "./providers/LayoutProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <ThemeProvider>
      <LayoutProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default App;

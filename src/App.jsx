import React from "react";
import { Routes, Route } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";

export const SearchContext = React.createContext("");

const theme = createTheme();

const App = () => {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;

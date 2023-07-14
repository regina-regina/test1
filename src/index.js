import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Result from "./Pages/Result";
import Question from "./Pages/Question";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/result" element={<Result />}/>
      <Route path="/question" element={<Question />}/>
    </Routes>
  </BrowserRouter>
);



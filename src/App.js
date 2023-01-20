import { BrowserRouter, Route, Routes } from "react-router-dom";
import Spacex from "./Components/Spacex";
import View from "./Components/View";

function App() {
  return (
   <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Spacex/>}/>
      <Route path="/view" element={<View/>}/>
      </Routes>
      </BrowserRouter>
      
      </>
  );
}

export default App;

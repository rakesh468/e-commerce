import {BrowserRouter as Router} from "react-router-dom";
import {DataProvider}from "./Globalstate";
import Header from "./components/Headers/Header";
import Pages from "./components/mainpages/Pages";

function App() {
  return (
    <DataProvider>
      <Router>
    <div className="App">
     <Header/>
     <Pages/>
    </div>
    </Router>
    </DataProvider>
  );
}

export default App;

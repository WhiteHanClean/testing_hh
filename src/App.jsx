import React, { useState } from "react";
import MyInput from "./component/UI/Input/MyInput";
import MyTable from "./component/UI/Table/MyTable";
import { BrowserRouter as Router } from "react-router-dom"; // Используйте BrowserRouter вместо Router и подключите useNavigate

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container">
      <MyInput setSearchQuery={setSearchQuery}/>
      <Router>
        <MyTable searchQuery={searchQuery}/>
      </Router>
    </div>
  );
}

export default App;

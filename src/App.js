import "./App.css";
import { useState } from "react";
import Contacts from "./components/contacts/Contacts";
import FormComponent from "./components/form/FormComponent";
import { addInfo,EditInfo } from "./utils/functions";
import { ToastContainer } from "react-toastify";

const initialVlaues = { username: "", phoneNumber: "", gender: "NO INFO" };

function App() {
  const [buttonLevel, setButtonLevel] = useState("ADD");
  const [info, setInfo] = useState(initialVlaues);

  const handleFormSubmit=(e)=>{
    // e.preventDefault();
    if (info.id){ 
      setButtonLevel("EDIT")
      EditInfo(info)}
    else{addInfo(info)}
  }

  const editHandler=(id,username,phoneNumber,gender)=>{
    setInfo({id,username,phoneNumber,gender});
  }; 
  return (
    <div className="App">
      <FormComponent 
        buttonLevel={buttonLevel} info={info} setInfo={setInfo} handleFormSubmit={handleFormSubmit}/>
      <Contacts editHandler={editHandler}   />
      <ToastContainer />
    </div>
  );
}

export default App;

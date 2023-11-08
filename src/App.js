import React, { useState } from "react";
import MainPage from './components//MainPage';
import LoginScreen from './components//LoginScreen';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
    return (
    <div id="mainpagediv">
        {currentForm === "login" ? <LoginScreen onFormSwitch={toggleForm} /> : <MainPage />}
    </div>
    );
};


export default App;

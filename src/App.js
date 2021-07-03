import React, { useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import NavigationBar from "./components/Navigation";
import Home from './components/Home';
import Login from './components/Login';



const App = () => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
    const handleLogIn = (data) => {
        localStorage.setItem('token', data);
        setIsLoggedIn(true);
    };
    const handleSignOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };
    
    const Authorized =
        <>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
        </>;
    const Unauthorized =
        <>
            <Route path="/login" component={() => <Login logIn={handleLogIn} />} />
            <Redirect to="/login" />
        </>;
    
    
    return (
        <>
            <NavigationBar loggedIn={isLoggedIn} signOut={handleSignOut} />
            <Switch>
                {isLoggedIn ? Authorized : Unauthorized}
            </Switch>
        </>
    );

}


export default App;

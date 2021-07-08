import React, { useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import NavigationBar from "./components/Navigation";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import BillDetail from './components/BillDetail';



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
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/bill/:billId" component={BillDetail} />
            <Redirect to="/home" />
        </Switch>;
    const Unauthorized =
        <Switch>
            <Route path="/login">
                <Login logIn={handleLogIn} />
            </Route>
            <Route path="/signup">
                <Signup logIn={handleLogIn} />
            </Route>
            <Redirect to="/login" />
        </Switch>;
    
    
    return (
        <>
            <NavigationBar loggedIn={isLoggedIn} signOut={handleSignOut} />
            {isLoggedIn ? Authorized : Unauthorized}
        </>
    );

}


export default App;

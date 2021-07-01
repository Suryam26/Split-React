import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import NavigationBar from "./components/Navigation";
import Home from "./components/Home";


function App() {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route path="/home" component={ Home } />
        <Redirect to="/home" /> 
      </Switch>
    </>
  );
}

export default App;

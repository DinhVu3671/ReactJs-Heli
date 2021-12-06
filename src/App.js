
import './App.css';
import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import UserInfoScreen from './screen/UserInfoScreen/UserInfoScreen';
import UserManaScreen from './screen/UserManaScreen/UserManaScreen';
import LoginScreen from './screen/LoginScreen/LoginScreen';




function App() {
 
  const locale = navigator.language.split(/[-_]/)[0];
  console.log(locale);
  return(
    
    <Switch>
      <Route exact path='/'>
        <Redirect to="/login" />
      </Route>   
      <Route path='/login' component={LoginScreen}/>  
      <Route path='/user-info' component={UserInfoScreen}>
      </Route>
      <Route path='/user-management' component={UserManaScreen}>
      </Route>
    </Switch>
    
    
  );
}
export default App;

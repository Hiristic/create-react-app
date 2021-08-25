import logo from './logo.svg';
import './App.css';
import * as Realm from "realm-web";
import React from 'react';

const REALM_APP_ID = "imvelo_realm_test-qozwh"; // e.g. myapp-abcde
const app = new Realm.App({ id: REALM_APP_ID });

// Create a component that displays the given user's details
function UserDetail({ user }) {
  return (
    <div>
      <h1>Logged in with id: {user.id}</h1>
    </div>
  );
}

// Create a component that lets an anonymous user log in
      // Create an email/password credential
function Login({ setUser }) {
  const loginUser = async () => {
    try {
      const user = await app.logIn(credentials);
      console.log("Successfully logged in!", user.id);
      return user;
    } catch (err) {
      console.error("Failed to log in", err.message);
    }
  }
  
  const loginAnonymous = async () => {
    const user = await app.logIn(Realm.Credentials.anonymous());
    setUser(user);
  };
  //return <button onClick={loginAnonymous}>Log In</button>;
  return <button onClick={loginUser}>Log In</button>;
}

const credentials = Realm.Credentials.emailPassword(
  "dado@dado.net",
  "123456"
);

const App = () => {
  // Keep the logged in Realm user in local state. This lets the app re-render
  // whenever the current user changes (e.g. logs in or logs out).
  const [user, setUser] = React.useState(app.currentUser);

  // If a user is logged in, show their details.
  // Otherwise, show the login screen.
  return (
    <div className="App">
      <div className="App-header">

        {user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
      </div>
    </div>
  );
}

export default App;



import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Logout from './components/logout';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import GooglePeopleAPI from './components/LoginPeople';
import GooglePhoneNumber from './components/GooglePhoneNum';

function App() {

  const API_KEY="AIzaSyBxF6m1X9hOG4BfvyQ2Mubl1FSt_b0_9Jo"
  const SCOPES = 'https://www.googleapis.com/auth/contacts.readonly';
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest';
const API_KEY2="AIzaSyBg0Et03C9f2-J_7ogV8qGkMkG0eBsFjlo"
// const access_token="ya29.a0AfH6SMB9Q1Z9Z9Q6Z9Z9Q6Z9Z9Q6Z9Q6Z9"
// var accessToken="";

  // useEffect(() => {
  //   function start(){
  //     gapi.client.init({  
  //       clientId: "307917576076-d92jmjbpmg7fq86etam3u8j9kep74qnp.apps.googleusercontent.com",
  //       scope:"https://www.googleapis.com/auth/user.phonenumbers.read"
  //     });
  //     }
  //   gapi.load('client:auth2',start);
  //   // let accessToken=gapi.auth.getToken().accessToken;
  // });

  // const accessToken=gapi.auth.getToken().accessToken;
//   const handleAuthClick = () => {
//     gapi.auth2.getAuthInstance().signIn().then((googleUser) => {
//         const profile = googleUser.getBasicProfile();
//         const accessToken = googleUser.getAuthResponse().access_token;

//         // Use accessToken to make API requests to the Google People API
//         fetch(`https://people.googleapis.com/v1/people/me?personFields=phoneNumbers`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//         });
//     });
// };

  return (
    <div className="App">
    {/* <Login/>
    <button id="authorize_button" onClick={handleAuthClick}>Authorize</button>
    <Logout/> */}
    {/* <GooglePeopleAPI/> */}
    <GooglePhoneNumber/>
    </div>
  );
}

export default App;

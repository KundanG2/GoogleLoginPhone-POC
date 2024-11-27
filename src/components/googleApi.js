import { gapi } from 'gapi-script';

const CLIENT_ID = '487989136370-q1u69i7365pujggrhd8ce2jl1i7p9sv2.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBMrrUIzWdbaq4CkpmaLmEIy7QN6lXfb90';
const SCOPES = 'https://www.googleapis.com/auth/user.phonenumbers.read';

export const initGoogleClient = () => {
  return gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
      scope: SCOPES,
    });
  });
};

import React, { useState, useEffect } from 'react';

const GooglePeopleAPI = () => {
  const CLIENT_ID = '487989136370-q1u69i7365pujggrhd8ce2jl1i7p9sv2.apps.googleusercontent.com'
  // '307917576076-d92jmjbpmg7fq86etam3u8j9kep74qnp.apps.googleusercontent.com';
  /*

  */
  const API_KEY = 'AIzaSyBMrrUIzWdbaq4CkpmaLmEIy7QN6lXfb90';
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest';
  const SCOPES = 'https://www.googleapis.com/auth/contacts.readonly';
  const SCOPES2 = 'https://www.googleapis.com/auth/user.phonenumbers.read';
  

  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [connections, setConnections] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const initializeGapiClient = async () => {
      await window.gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      setGapiInited(true);
    };

    const loadGapi = () => {
      window.gapi.load('client', initializeGapiClient);
    };

    const loadGis = () => {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (resp) => handleAuthCallback(resp),
      });
      setTokenClient(client);
      setGisInited(true);
    };

    // Load Google API scripts
    const script1 = document.createElement('script');
    script1.src = 'https://apis.google.com/js/api.js';
    script1.onload = loadGapi;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://accounts.google.com/gsi/client';
    script2.onload = loadGis;
    document.body.appendChild(script2);
  }, []);

  const handleAuthClick = () => {
    tokenClient.requestAccessToken({ prompt: isAuthorized ? '' : 'consent' });
  };

  const handleSignoutClick = () => {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken('');
      setIsAuthorized(false);
      setConnections([]);
    }
  };

  const handleAuthCallback = async (resp) => {
    if (resp.error) {
      throw resp;
    }
    setIsAuthorized(true);
    await listConnectionNames();
  };

  const listConnectionNames = async () => {
    try {
      const response = await window.gapi.client.people.people.connections.list({
        resourceName: 'people/me',
        pageSize: 10,
        personFields: 'names,emailAddresses,phoneNumbers',
      });
      const contacts = response.result.connections || [];
      setConnections(
        contacts.map((person) => ({
          name: person.names?.[0]?.displayName || 'No Name',
          email: person.emailAddresses?.[0]?.value || 'No Email',
          phoneNumber: person.phoneNumbers?.[0]?.value || 'No Phone Number',
        }))
      );
    } catch (err) {
      console.error('Error fetching connections', err.message);
    }
  };

  return (
    <div>
      <h2>People API Quickstart</h2>
      <button onClick={handleAuthClick} disabled={!gapiInited || !gisInited}>
        {isAuthorized ? 'Refresh' : 'Authorize'}
      </button>
      <button onClick={handleSignoutClick} disabled={!isAuthorized}>
        Sign Out
      </button>
      <div>
        {connections.length > 0 ? (
          <pre>{JSON.stringify(connections, null, 2)}</pre>
        ) : (
          <p>No connections found.</p>
        )}
      </div>
    </div>
  );
};

export default GooglePeopleAPI;

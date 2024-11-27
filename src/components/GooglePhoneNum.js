import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { initGoogleClient } from './googleApi';

const GooglePhoneNumber = () => {
  useEffect(() => {
    initGoogleClient();
  }, []);

  const fetchPhoneNumber = async () => {
    try {
      // Ensure the user is signed in
      const authInstance = gapi.auth2.getAuthInstance();
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }

      // Fetch the user's phone number
      const response = await gapi.client.people.people.get({
        resourceName: 'people/me',
        personFields: 'phoneNumbers',
      });

      console.log('Phone Number:', response.result.phoneNumbers);
      alert(`Phone Number: ${response.result.phoneNumbers[0]?.value || 'No phone number found'}`);
    } catch (error) {
      console.error('Error fetching phone number:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchPhoneNumber}>Fetch Phone Number</button>
    </div>
  );
};

export default GooglePhoneNumber;

import {
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  View,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { useEffect, useState } from 'react';
import outputs from '../amplify_outputs.json';
import './App.css';
/**
 * @type {import('aws-amplify/data').Client<Import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: 'userPool',
});

function App() {
  const [userProfiles, setUserProfiles] = useState([]);
  const { signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    const { data: profiles } = await client.models.UserProfile.list();
    setUserProfiles(profiles);
  }

  return (
    <Flex
      className="App"
      justifyContent="center"
      alignItems="center"
      direction="column"
      width="70%"
      margin="0 auto"
    >
      <Heading level={1}>My Profile</Heading>

      <Divider />

      <Grid
        margin="3rem 0"
        autoFlow="column"
        justifyContent="center"
        gap="2rem"
        alignContent="center"
      >
        {userProfiles.map((userProfile) => {
          <Flex
            key={userProfile.id || userProfile.email}
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
            border="1px solid #ccc"
            padding="2rem"
            borderRadius="5%"
            className="box"
          >
            <View>
              <Heading level="3">{userProfile.email}</Heading>
            </View>
          </Flex>;
        })}
      </Grid>
      <Button onClick={signOut}>Sign Out</Button>
    </Flex>
  );
}

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

//Les imports ci-dessous servent à implémenter des fonctionnalités
//requises pour le projet
import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
  TextInput,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ReactNativeBiometrics from 'react-native-biometrics'
let keys;

//Cela signifie que la constante App est de type fonction et qu'elle renvoie Node.
const App: () => Node = () => {

//Les parties de codes spécifiant dark servent à permettre de changer l'apparence de
//l'application en sombre
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [register_first_name, onChangeRegisterFirstName] = React.useState(null);
  const [register_last_name, onChangeRegisterLastName] = React.useState(null);

  const [login_first_name, onChangeLoginFirstName] = React.useState(null);
  const [login_last_name, onChangeLoginLastName] = React.useState(null);

  function register () {
    ReactNativeBiometrics.createKeys('Confirm fingerprint')
      .then((resultObject) => {
        const { publicKey } = resultObject
        console.log(publicKey)
        sendPublicKeyToServer(publicKey)
      })
  }

  function login () {
    ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then((resultObject) => {
        const { success } = resultObject

        if (success) {
          console.log('successful biometrics provided')
        } else {
          console.log('user cancelled biometric prompt')
        }
      })
      .catch(() => {
        console.log('biometrics failed')
      })
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Login</Text>
           <TextInput
              onChangeText={onChangeLoginFirstName}
              value={login_first_name}
            />
             <TextInput
               onChangeText={onChangeLoginLastName}
               value={login_last_name}
             />
             <Button
               onPress={login}
               title="Login"
               color="#1E90FF"
             />
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Register</Text>
           <TextInput
              onChangeText={onChangeRegisterFirstName}
              value={register_first_name}
              placeholder="Nom"
            />
             <TextInput
               onChangeText={onChangeRegisterLastName}
               value={register_last_name}
              placeholder="Prénom"
             />
             <Button
               onPress={register}
               title="Save"
               color="#1E90FF"
             />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

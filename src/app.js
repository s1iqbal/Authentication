import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBLVZ1ChSdhL8_yYiBXqek1qg9H0YPiz0A',
      authDomain: 'auth-45c30.firebaseapp.com',
      databaseURL: 'https://auth-45c30.firebaseio.com',
      storageBucket: 'auth-45c30.appspot.com',
      messagingSenderId: '285192068943'
    });

        firebase.auth().onAuthStateChanged(
          (user) => {
          //checks if either user is logged in or not and sets the state.
          if (user) {
            this.setState({ loggedIn: true });
          } else {
            this.setState ({ loggedIn: false });
          }
        }
      );
  }

  renderContent() {
    const { buttonStyle, textStyle } = styles;
    switch (this.state.loggedIn) {
      //Had to add manual button due to flex:1 for reusable being unstable.
      case true: return <TouchableOpacity
       onPress={() => firebase.auth().signOut()}
       style={buttonStyle}>
          <Text style={textStyle}>
            Log Out
          </Text>
        </TouchableOpacity>;

      case false: return <LoginForm />;
      default: <Spinner size="large" />;
    }


  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>

    );
  }
}
const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {

    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

export default App;

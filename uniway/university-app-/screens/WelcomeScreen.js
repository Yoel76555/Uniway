import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config';
import firebase from 'firebase';
import HomeScreen from './HomeScreen';

export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isVisible: false,
      firstName: '',
      lastName: '',
      mobileNumber: '',
      address: '',
      confirmPassword: '',
    };
  }

  userLogin = (username, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        this.props.navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  userSignUp = (username, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then((response) => {
          db.collection('users').add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            mobile_number: this.state.mobileNumber,
            username: this.state.username,
            address: this.state.address,
          });
          return Alert.alert('User Added Successfully', '', [
            { text: 'OK', onPress: () => this.setState({ isVisible: false }) },
          ]);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  showModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisible}>
      <View style={styles.modalContainer}>
        <ScrollView style={{ width: '100%' }}>
          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 30,
                color: 'purple',
                margin: 50,
              }}>
              Registration
            </Text>
             <Text style={styles.label}> First Name </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'First Name'}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  firstName: text,
                });
              }}
            />
             <Text style={styles.label}> Last Name </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'Last Name'}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  lastName: text,
                });
              }}
            />
             <Text style={styles.label}> Mobile Number </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'Mobile Number'}
              maxLength={10}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                this.setState({
                  mobileNumber: text,
                });
              }}
            />
             <Text style={styles.label}> Address </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'Address'}
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
            />
             <Text style={styles.label}> Username </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'Username'}
              keyboardType={'email-address'}
              onChangeText={(text) => {
                this.setState({
                  username: text,
                });
              }}
            />
             <Text style={styles.label}> Password </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'Password'}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
             <Text style={styles.label}> Confrim Password </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'Confrim Password'}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text,
                });
              }}
            />
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() =>
                  this.userSignUp(
                    this.state.username,
                    this.state.password,
                    this.state.confirmPassword
                  )
                }>
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.setState({ isVisible: false })}>
                <Text
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {this.showModal()}
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Uniway</Text>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {' '}
            Easy Way to University{' '}
          </Text>
          <Image
            source={require('../assets/Uniway-logo.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 55,
            }}>
            USERNAME
          </Text>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={styles.loginBox}
              keyboardType={'email-address'}
              onChangeText={(text) => {
                this.setState({
                  username: text,
                });
              }}
            />
          </View>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 55,
            }}>
            PASSWORD
          </Text>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={styles.loginBox}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 10 }]}
              onPress={() => {
                this.userLogin(this.state.username, this.state.password);
              }}>
              <Text
                style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                LOGIN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({ isVisible: true });
              }}>
              <Text
                style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 65,
    fontWeight: 'bold',
    paddingBottom: 30,
    color: 'white',
    marginLeft: 60,
  },
  loginBox: {
    width: '80%',
    height: RFValue(50),
    borderWidth: 1.5,
    borderColor: '#ffffff',
    fontSize: RFValue(20),
    paddingLeft: RFValue(10),
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: '#ff5722',
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  image: {
    width: '60%',
    height: '40%',
    marginBottom: 30,
    borderWidth: 5,
    borderColor: '#ffff',
    borderRadius: 20,
  },
  formTextInput: {
    width: '90%',
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'grey',
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14),
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    fontSize: 20,
    backgroundColor: 'purple',
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    marginLeft: 15,
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
  },
});


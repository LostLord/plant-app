import React, {Component} from 'react';
import {ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, StyleSheet} from 'react-native';

import {Block, Button, Input, Text} from '../components';
import {theme} from '../constants';

export default class SignUp extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    errors: [],
    loading: false
  }

  handleSignUp() {
    const {navigation} = this.props;
    const {email, username, password} = this.state;
    const errors = [];

    if (!email) errors.push('email');
    if (!username) errors.push('username');
    if (!password) errors.push('password');

    Keyboard.dismiss();
    this.setState({loading: true, errors})
    setTimeout(() => {
      this.setState({loading: false});
      if (!errors.length) {
        Alert.alert(
          'Success!',
          'Your account has been created.',
          [
            {
              text: 'OK', onPress: () => {
                navigation.navigate('Browse')
              }
            }
          ],
          {cancelable: false}
        );
      }
    }, 2000);
  }

  render() {
    const {navigation} = this.props;
    const {errors, loading} = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.signUp} behavior="padding">
        <Block padding={[0, theme.sizes.padding * 2]}>
          <Text h1 bold>Sign up</Text>
          <Block middle>
            <Input
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({email: text})}
            />
            <Input
              label="Username"
              error={hasErrors('username')}
              style={[styles.input, hasErrors('username')]}
              defaultValue={this.state.username}
              onChangeText={text => this.setState({username: text})}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({password: text})}
            />
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ?
                <ActivityIndicator size="small" color="white"/> :
                <Text bold white center>Sign up</Text>
              }
            </Button>
            <Button onPress={() => navigation.navigate('Login')}>
              <Text gray caption center style={{textDecorationLine: 'underline'}}>Back to Login</Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  signUp: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  },
});

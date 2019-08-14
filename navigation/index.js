import React from 'react';
import {Image} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import Browse from '../screens/Browse';
import Explore from '../screens/Explore';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Forgot from '../screens/Forgot';
import Product from '../screens/Product';
import Settings from '../screens/Settings';
import Welcome from '../screens/Welcome';

import {theme} from '../constants';

const screens = createStackNavigator({
  Welcome,
  Settings,
  Browse,
  SignUp,
  Forgot,
  Product,
  Explore,
  Login,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: theme.colors.white,
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
    headerBackImage: <Image source={require('../assets/icons/back.png')}/>,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.padding * 2,
      paddingRight: theme.sizes.base
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base
    },
  },
});

export default createAppContainer(screens);

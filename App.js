import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';

import {Block} from './components';
import Navigation from './navigation';

// import all used images
const images = [
  require('./assets/images/avatar.png'),
  require('./assets/images/explore_1.png'),
  require('./assets/images/explore_2.png'),
  require('./assets/images/explore_3.png'),
  require('./assets/images/explore_4.png'),
  require('./assets/images/explore_5.png'),
  require('./assets/images/explore_6.png'),
  require('./assets/images/plants_1.png'),
  require('./assets/images/plants_2.png'),
  require('./assets/images/plants_3.png'),
  require('./assets/icons/back.png'),
  require('./assets/icons/fertilizers.png'),
  require('./assets/icons/flowers.png'),
  require('./assets/icons/plants.png'),
  require('./assets/icons/seeds.png'),
  require('./assets/icons/sprayers.png'),
  require('./assets/icons/pots.png'),
];

export default class App extends Component {
  state = {
    isLoadingComplete: false
  }

  handleResourcesSync = async () => {
    // cache all the images
    // for the better performance on the app
    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    });

    return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesSync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({isLoadingComplete: true})}
        />
      );
    }

    return (
      <Block>
        <Navigation/>
      </Block>
    );
  }
}

const styles = StyleSheet.create({});

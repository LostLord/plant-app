import React, {Component} from 'react';
import {Animated, Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet} from 'react-native';

import {Block, Button, Text} from '../components'
import {theme} from '../constants';

const {width, height} = Dimensions.get('window');

class Welcome extends Component {
  static navigationOptions = {
    header: null
  }

  scrollX = new Animated.Value(0)

  state = {
    showTerms: false,
  }

  renderIllustration() {
    const {illustrations} = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraData={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({item}) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{width, height: height / 2, overflow: 'visible'}}
          />
        )}
        onScroll={
          Animated.event([{
            nativeEvent: {contentOffset: {x: this.scrollX}}
          }
          ])
        }
      />
    );
  }

  renderSteps() {
    const {illustrations} = this.props;
    const stepPosition = Animated.divide(this.scrollX, width)

    return (
      <Block row center middle style={styles.stepContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp'
          })
          return (
            <Block
              animated
              flex={false}
              color="gray"
              key={`step-${index}`}
              style={[styles.steps, {opacity}]}
            />
          )
        })}
      </Block>
    );
  }

  renderTermService() {
    return (
      <Modal animationType="slide" visible={this.state.showTerms}>
        <Block padding={[theme.sizes.padding * 2, theme.sizes.padding]} space="between">
          <Text h2 light>Term of Service</Text>
          <ScrollView style={{paddingVertical: theme.sizes.padding}} showsVerticalScrollIndicator={false}>
            <Text caption gray height={18}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores repellendus
              officiis harum quae, voluptatem odio quas. Adipisci repellat quo atque eius perspiciatis suscipit animi,
              tenetur quasi omnis, obcaecati unde et?</Text>
            <Text caption gray height={18}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores repellendus
              officiis harum quae, voluptatem odio quas. Adipisci repellat quo atque eius perspiciatis suscipit animi,
              tenetur quasi omnis, obcaecati unde et?</Text>
            <Text caption gray height={18}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores repellendus
              officiis harum quae, voluptatem odio quas. Adipisci repellat quo atque eius perspiciatis suscipit animi,
              tenetur quasi omnis, obcaecati unde et?</Text>
            <Text caption gray height={18}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores repellendus
              officiis harum quae, voluptatem odio quas. Adipisci repellat quo atque eius perspiciatis suscipit animi,
              tenetur quasi omnis, obcaecati unde et?</Text>
            <Text caption gray height={18}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores repellendus
              officiis harum quae, voluptatem odio quas. Adipisci repellat quo atque eius perspiciatis suscipit animi,
              tenetur quasi omnis, obcaecati unde et?</Text>
            <Text caption gray height={18}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores repellendus
              officiis harum quae, voluptatem odio quas. Adipisci repellat quo atque eius perspiciatis suscipit animi,
              tenetur quasi omnis, obcaecati unde et?</Text>
            <Text caption gray height={18}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores repellendus
              officiis harum quae, voluptatem odio quas. Adipisci repellat quo atque eius perspiciatis suscipit animi,
              tenetur quasi omnis, obcaecati unde et?</Text>
            <Text caption gray height={18}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores repellendus
              officiis harum quae, voluptatem odio quas. Adipisci repellat quo atque eius perspiciatis suscipit animi,
              tenetur quasi omnis, obcaecati unde et?</Text>
            <Text caption gray height={18}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores repellendus
              officiis harum quae, voluptatem odio quas. Adipisci repellat quo atque eius perspiciatis suscipit animi,
              tenetur quasi omnis, obcaecati unde et?</Text>
            <Text caption gray height={18}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores repellendus
              officiis harum quae, voluptatem odio quas. Adipisci repellat quo atque eius perspiciatis suscipit animi,
              tenetur quasi omnis, obcaecati unde et?</Text>
            <Text caption gray height={18}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores repellendus
              officiis harum quae, voluptatem odio quas. Adipisci repellat quo atque eius perspiciatis suscipit animi,
              tenetur quasi omnis, obcaecati unde et?</Text>
          </ScrollView>
          <Button gradient onPress={() => this.setState({showTerms: false})}>
            <Text center white>I understand</Text>
          </Button>
        </Block>
      </Modal>
    )
  }

  render() {
    const {navigation} = this.props;

    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold>
            Your Home.
            <Text h1 primary>Greener.</Text>
          </Text>
          <Text h3 gray style={{marginTop: theme.sizes.padding / 2}}>Enjoy the experience.</Text>
        </Block>
        <Block center middle>
          {this.renderIllustration()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate('Login')}>
            <Text center semibold white>Login</Text>
          </Button>
          <Button shadow onPress={() => navigation.navigate('SignUp')}>
            <Text center semibold>Sign up</Text>
          </Button>
          <Button onPress={() => this.setState({showTerms: true})}>
            <Text center caption gray>Term of service</Text>
          </Button>
        </Block>
        {this.renderTermService()}
      </Block>
    )
  }
}

Welcome.defaultProps = {
  illustrations: [
    {id: 1, source: require('../assets/images/illustration_1.png')},
    {id: 2, source: require('../assets/images/illustration_2.png')},
    {id: 3, source: require('../assets/images/illustration_3.png')},
  ]
}

export default Welcome;

const styles = StyleSheet.create({
  stepContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  },
})

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import { scale } from 'react-native-size-matters';
import coffee from '../assets/images/coffee.png'
import RNShake from 'react-native-shake';

export default class ShowMe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showing: false,
      fontSize: new Animated.Value(10)
    }
  }

  componentWillMount() {
    RNShake.addEventListener('ShakeEvent', () => {
      this.show()
    });
  }

  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent');
  }

  animate(size) {
   Animated.timing(                  // Animate over time
     this.state.fontSize,            // The animated value to drive
     {
       toValue: scale(size),
       easing: Easing.bounce,           // Animate to opacity: 1 (opaque)
       duration: 1200,              // Make it take a while
     }
   ).start();                        // Starts the animation
 }


  onPress = () => {
    var showing = this.state.showing
    if (showing) {
      const {navigate} = this.props.navigation
      navigate('Home')
    } else {
      this.show()
    }
  }

  show() {
    this.setState( {showing: true} )
    const text = this.props.navigation.getParam('value')
    const charCount = text.length
    const size = charCount == 3 ? 180 : (charCount == 2 || text == 'C' || text == '?') ? 280 : 420
    this.animate(size)
  }

  renderText = () => {
    var fontSize = this.state.fontSize
    var text = this.props.navigation.getParam('value')
    if (this.state.showing) {
      if (text == 'C') {
        return <Animated.Image source={require('../assets/images/coffee.png')} style={{height:fontSize,width:fontSize}} />
      } else if (text == '?') {
        return <Animated.Image source={require('../assets/images/shrug.png')} style={{height:fontSize,width:fontSize}} />
      } else {
        return <Animated.Text style={{textAlignVertical: 'center', color: 'white', backgroundColor:'#1976d2', textAlign: 'center', fontSize: fontSize, width:'100%', height:'100%'}}>{text}</Animated.Text>
      }
    } else {
      return <Image source={require('../assets/images/batwings.png')} />
    }
  }

  render() {
    return (
      <TouchableOpacity style={{flex: 1}} onPress={this.onPress}>

        <View style={{flex: 1, backgroundColor: '#004ba0', alignItems: 'center', justifyContent: 'center'}}>
        { this.renderText() }
          </View>
      </TouchableOpacity>
    )
  }

}

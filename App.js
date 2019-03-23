import React, { Component } from 'react';
import { AppRegistry, StatusBar, View, Text, Image, TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import { scale } from 'react-native-size-matters';
import ShowMe from './screens/ShowMe'

class ProntoScrum extends Component {
  constructor(props) {
    super(props)
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler(value) {
        const {navigate} = this.props.navigation;
        navigate('ShowMe', {value: value, closeHandler: this.closeHandler})
    }

  render() {

    return  (
      <Numbers onSelect={this.changeHandler}/>
    )
  }
}

class Numbers extends Component {
  render() {

    return (
      <View style={{flex: 1}}>
        <StatusBar hidden />
        <Row values="0,1,2" onSelect={this.props.onSelect}/>
        <Row values="3,5,8" onSelect={this.props.onSelect}/>
        <Row values="13,20,40" onSelect={this.props.onSelect}/>
        <Row values="100,?,C" onSelect={this.props.onSelect}/>
      </View>
    );
  }
}

class Row extends Component {
  render() {

    var rows = [];
    let array = this.props.values.split(',')
    for (var i=0; i<array.length; i++) {
      rows.push(<Card value={array[i]} onSelect={this.props.onSelect}/>)
    }
    return (
      <View style={{flex:1, flexDirection: 'row', textAlignVertical: 'center'}}>
        {rows}
      </View>
    )
  }
}

class Card extends Component {
  onPress = () => {
    this.props.onSelect(this.props.value)
  }

  renderContent = () => {
    let val = this.props.value
    var size = val == '100' ? scale(58) : scale(70)
    if (val == '?') {
          return <Image source={require('./assets/images/shrug.png')} style={{height:size,width:size}} />
    } else if (val == 'C') {
        return <Image source={require('./assets/images/coffee.png')}  style={{height:size,width:size}} />
    } else {
      return <Text style={{color: 'white',  backgroundColor:'#1976d2',textAlign: 'center', textAlignVertical: 'center',fontSize: size, height: '100%', width: '100%' }} >{this.props.value}</Text>
    }
  }

  render() {

    return (
      <TouchableOpacity style={{flex: 1}} onPress={this.onPress}>
        <View style={{flex:1, backgroundColor:'#1976d2', borderWidth:1, borderColor: 'white', borderStyle:'solid', justifyContent: 'center',
    alignItems: 'center' }}>
      { this.renderContent() }
            </View>
      </TouchableOpacity>
    )
}
}

const AppNavigator = createStackNavigator({
  Home: {screen: ProntoScrum},
  ShowMe: {screen: ShowMe},
},
{
  headerMode: 'none'
});

const App = createAppContainer(AppNavigator);
export default App;

AppRegistry.registerComponent('ProntoScrum', () => App);

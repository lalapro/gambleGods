/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import StyleConfig from '../StyleConfig';
import * as API from '../API.js';
import AppImages from '../../assets/images/AppImages';
import {Button, Card} from '../components';
import ROOMDETAILS from '../FAKEDATA.js';
import * as AppActions from '../AppActions.js';
import {selectedGameActions} from '../redux/actions';

const {
  WIDTH,
  blue,
  white,
  grey2,
  red,
  green,
  purple,
  nobel16,
  nobel12,
  dollyReg16,
} = StyleConfig;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: blue,
  },
  roomName: {
    ...nobel16,
  },
});

type Props = {};

class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      roomName: 'Dark Table',
    };
  }

  async componentDidMount() {
    // console.log(this.props.selectedGame)
  }

  async selectGameToView() {
    const {setSelectedGame} = this.props;
    setSelectedGame({...ROOMDETAILS.poker});
  }

  // async fetchRoom() {
  //   let room = await API.checkRoomId('test')
  //   console.log(room)
  //   return room
  // }

  render() {
    const {componentId, selectedGameActions} = this.props;
    const {roomName} = this.state;
    const {gameTypes, members} = ROOMDETAILS;
    // console.log(this.props)
    return (
      <View style={styles.container}>
        <View style={{width: '100%', height: 50}} />
        <Text style={styles.roomName}>{roomName}</Text>
        <Text style={{...nobel12}}>Members:</Text>
        {members.map(member => (
          <Text key={member.name} style={{...nobel12}}>
            {member.name}
          </Text>
        ))}
        <Card
          onPress={() => {
            this.selectGameToView('Poker');
            AppActions.pushScreen(componentId, 'GameDetails');
          }}
          mainText={'Poker'}
          subText={'TBD'}
        />
        <Card
          onPress={() => {
            this.selectGameToView('Big 2');
            AppActions.pushScreen(componentId, 'BigTwo');
          }}
          mainText={'BigTwo'}
          subText={'Add game'}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedGame: state.selectedGame,
  };
}

const mapDispatchToProps = {
  ...selectedGameActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

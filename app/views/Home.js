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
      showHiddenStats: false,
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
    const {componentId, selectedGameActions, gameState} = this.props;
    const {roomName, showHiddenStats} = this.state;
    const {users} = gameState;
    const {gameTypes, members} = ROOMDETAILS;
    return (
      <View style={styles.container}>
        <View style={{width: '100%', height: 50}} />
        <TouchableOpacity
          onPress={() => {
            this.setState({showHiddenStats: !showHiddenStats});
          }}>
          <Text style={styles.roomName}>{roomName}</Text>
        </TouchableOpacity>
        {showHiddenStats &&
          users &&
          Object.keys(users).map(member => {
            let show = users[member].totalWinnings;
            let negative = false;
            if (show < 0) {
              negative = true;
              show = show * -1;
            }
            return (
              <Text key={member}>
                {member} -
                <Text
                  style={{
                    color: show === 0 ? 'black' : negative ? red : green,
                  }}>
                  {' '}
                  ${show}
                </Text>
              </Text>
            );
          })}
        <Card
          onPress={() => {
            this.selectGameToView('Big 2');
            AppActions.pushScreen(componentId, 'BigTwo');
          }}
          mainText={'BigTwo'}
          subText={'Ready To Play'}
        />
        <Card
          onPress={() => {
            // this.selectGameToView('Poker');
            // AppActions.pushScreen(componentId, 'GameDetails');
          }}
          mainText={'Poker'}
          subText={'TBD'}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedGame: state.selectedGame,
    gameState: state.gameState,
  };
}

const mapDispatchToProps = {
  ...selectedGameActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { Button, Card } from '../components';
import ROOMDETAILS from '../FAKEDATA.js';
import * as AppActions from '../AppActions.js';
import { selectedGameActions } from '../redux/actions';

const {
  WIDTH,
  blue,
  white,
  grey2,
  red,
  green,
  purple,
  nobel16,
  nobelBold22,
  nobel14,
  dollyReg16,
} = StyleConfig;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: blue,
  },
  roomName: {
    ...nobelBold22,
  },
});

type Props = {};

class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      roomName: 'DARK TABLE',
      showHiddenStats: false,
      counter: 0,
    };
  }

  async componentDidMount() {
    // console.log(this.props.selectedGame)
  }

  async selectGameToView() {
    const { setSelectedGame } = this.props;
    setSelectedGame({ ...ROOMDETAILS.poker });
  }

  trigger() {
    const { counter, showHiddenStats } = this.state;
    const newCounter = counter + 1;
    if (showHiddenStats) {
      this.setState({ showHiddenStats: false, counter: 0 });
      return;
    }
    this.setState({ counter: newCounter }, () => {
      if (this.state.counter === 3) {
        this.setState({ showHiddenStats: true });
      }
    });
  }

  // async fetchRoom() {
  //   let room = await API.checkRoomId('test')
  //   console.log(room)
  //   return room
  // }

  render() {
    const { componentId, selectedGameActions, gameState } = this.props;
    const { roomName, showHiddenStats } = this.state;
    const { users, selectedLobby } = gameState;
    const { gameTypes, members } = ROOMDETAILS;
    return (
      <View style={styles.container}>
        <View style={{ width: '100%', height: 50 }} />
        <TouchableOpacity onPress={() => this.trigger()}>
          <Text style={styles.roomName}>{selectedLobby.name}</Text>
        </TouchableOpacity>
        {showHiddenStats &&
          users &&
          users.map(member => {
            let show = member.totalWinnings;
            let negative = false;
            if (show < 0) {
              negative = true;
              show = show * -1;
            }
            return (
              <Text key={member.name} style={{ ...nobel14 }}>
                {member.name} -
                <Text
                  style={{
                    color: show === 0 ? 'black' : negative ? red : green,
                  }}
                >
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
        <Card
          onPress={() => {
            AppActions.pushScreen(componentId, 'Stats');
          }}
          mainText={'Stats'}
          subText={'WIP'}
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
  mapDispatchToProps
)(Home);

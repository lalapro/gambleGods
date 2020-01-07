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
import { Button, Car, LobbyCard } from '../components';
import ROOMDETAILS from '../FAKEDATA.js';
import * as AppActions from '../AppActions.js';
import { selectedGameActions, gameStateActions } from '../redux/actions';

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

class Lobby extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      roomName: 'DARK TABLE'
    };
  }

  async componentDidMount() {
    // console.log(this.props.selectedGame)
  }

  render() {
    const {
      componentId,
      selectedGameActions,
      gameState,
      setGameState,
    } = this.props;
    const { roomName, showHiddenStats } = this.state;
    const { allLobbies } = gameState;
    const { gameTypes, members } = ROOMDETAILS;
    return (
      <View style={styles.container}>
        <View style={{ width: '100%', height: 50 }} />
        <TouchableOpacity onPress={() => this.trigger()}>
          <Text style={styles.roomName}>CHOOSE A LOBBY</Text>
        </TouchableOpacity>
        {allLobbies &&
          allLobbies.map(lobby => {
            const { name, users } = lobby;
            return (
              <LobbyCard
                onPress={async () => {
                  if (name === 'Dark Table') {
                    await setGameState({ selectedLobby: lobby });
                    AppActions.startHome();
                  }
                }}
                mainText={name}
                players={users && Object.values(users)}
              />
            );
          })}
        <LobbyCard
          onPress={() => {
            // this.selectGameToView('Big 2');
            // AppActions.pushScreen(componentId, 'BigTwo');
          }}
          mainText={'MAKE A LOBBY'}
          // subText={'Ready To Play'}
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
  ...gameStateActions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);

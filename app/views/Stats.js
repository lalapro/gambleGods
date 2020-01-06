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
import { Button, Card, PersonCircle } from '../components';
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
  nobelBold16,
} = StyleConfig;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black'
  },
  roomName: {
    ...nobelBold22,
    color: 'white'
  },

  backTouch: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
    justifyContent: 'center',
    tintColor: 'white'
  }
});

type Props = {};

class Stats extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    // console.log(this.props.selectedGame)
  }

  async selectGameToView() {}

  render() {
    const { componentId, gameState } = this.props;
    const { users } = gameState;
    return (
      <View style={styles.container}>
        <View style={{ width: '100%', height: 50 }} />
        <TouchableOpacity
          onPress={() => AppActions.popScreen(componentId)}
          style={styles.backTouch}
        >
          <Image
            source={AppImages.whiteBack}
            style={{ width: 50, height: 50, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <Text style={styles.roomName}>STATS</Text>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
          style={{ width: '100%' }}
        >
          {users &&
            users.map(member => {
              const { stats, totalWinnings } = member;
              const {
                bestGameWin,
                bestRoundWin,
                bestSessionWin,
                gamesWon,
                totalGames,
                roundsWon,
              } = stats.bigTwo;
              if (totalWinnings === 0) {
                return null;
              }
              return (
                <View
                  key={`${member.abrv}stat`}
                  style={{ alignItems: 'center', marginTop: 20 }}
                >
                  <Text
                    style={{
                      ...nobelBold16,
                      textDecorationLine: 'underline',
                      color: 'white'
                    }}
                  >
                    {member.name}
                  </Text>
                  <View style={{ alignItems: 'flex-start' }}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ ...nobel16, color: 'white' }}>
                        <Text>{`Total Games - ${totalGames}`}</Text>
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ ...nobel16, color: 'white' }}>
                        <Text>{`Games Won - ${gamesWon}`}</Text>
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ ...nobel16, color: 'white' }}>
                        <Text>{`Win Percent - ${Math.round(
                          (gamesWon / totalGames) * 100
                        )}%`}</Text>
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ ...nobel16, color: 'white' }}>
                        <Text>{`Rounds Won - ${roundsWon}`}</Text>
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ ...nobel16, color: 'white' }}>
                        <Text>{`Best Game - $${bestGameWin}`}</Text>
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ ...nobel16, color: 'white' }}>
                        <Text>{`Best Round - $${bestRoundWin}`}</Text>
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ ...nobel16, color: 'white' }}>
                        <Text>{`Best Session - $${bestSessionWin}`}</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          <View style={{ height: 100, width: '100%' }} />
        </ScrollView>
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
)(Stats);

//
// <View
//   style={{
//     marginTop: 30,
//     width: '100%',
//     flexDirection: 'row'
//   }}
// >
//   <View style={{ width: 80, backgroundColor: 'green', height: 50 }} />
//   <View
//     style={{
//       flexDirection: 'row',
//       backgroundColor: 'red',
//       justifyContent: 'space-between',
//       flexGrow: 1
//     }}
//   >
// {users &&
//   users.map(member => {
//     const { stats, totalWinnings } = member;
//     const {
//       bestGameWin,
//       bestRoundWin,
//       bestSessionWin,
//       gamesWon,
//       totalGames,
//       roundsWon,
//     } = stats.bigTwo;
//     if (totalWinnings === 0) {
//       return null;
//     }
//     return (
//       <View key={`${member.abrv}stat`}>
//         <PersonCircle name={member.abrv} color={green} />
//       </View>
//     );
//   })}
//   </View>
// </View>
// <ScrollView style={{ width: '100%' }}>
// <View style={{ alignItems: 'flex-start' }}>
//   <View style={{ alignItems: 'center' }}>
//     <Text>{"Best Game"}</Text>
//   </View>
//   <View style={{ alignItems: 'center' }}>
//     <Text>{"Best Round"}</Text>
//   </View>
//   <View style={{ alignItems: 'center' }}>
//     <Text>{"Best Session"}</Text>
//   </View>
//   <View style={{ alignItems: 'center' }}>
//     <Text>{"Games Won"}</Text>
//   </View>
//   <View style={{ alignItems: 'center' }}>
//     <Text>{"Rounds Won"}</Text>
//   </View>
//   <View style={{ alignItems: 'center' }}>
//     <Text>{"Total Games"}</Text>
//   </View>
// </View>
// </ScrollView>

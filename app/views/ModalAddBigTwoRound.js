import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  LayoutAnimation,
  TextInput,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import StyleConfig from '../StyleConfig';
import ROOMDETAILS from '../FAKEDATA.js';
import ModalCardsLeft from './ModalCardsLeft.js';
import ModalEndGame from './ModalEndGame.js';
import AppImages from '../../assets/images/AppImages';
import {Button, Card, PersonCircle} from '../components';
import * as AppActions from '../AppActions.js';
import {selectedGameActions} from '../redux/actions';
import * as API from '../API.js';

const {
  WIDTH,
  white,
  nobelBold12,
  nobelBold18,
  green,
  dollyReg16,
  black,
  red,
} = StyleConfig;

const {members} = ROOMDETAILS;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: white,
    alignSelf: 'center',
  },
  firstTimeSplash: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  bottomContainer: {
    backgroundColor: white,
  },
  enterAddress: {
    ...nobelBold12,
    color: green,
    marginTop: 10,
    marginBottom: 20,
  },
  shareText: {
    ...dollyReg16,
    marginTop: 10,
    marginBottom: 20,
  },
  header: {
    position: 'absolute',
    backgroundColor: white,
    width: WIDTH - 50,
    alignSelf: 'center',
    height: 94,
    top: -50,
  },
});

const LinearSlideAnimation = {
  duration: 250,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

class ModalBigTwoRound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members,
      players: [],
      priceOptions: [1, 2, 3, 4],
      rounds: [1, 2, 3, 4],
      lockPlayers: false,
      selectedPrice: 0,
      step2: false,
      currentRound: 0,
      currentSet: 1,
      showModal: false,
      selectedPlayer: null,
      games: [],
      x: 0,
      y: 0,
      currentSetPlayersAccountedFor: 0,
      isEdit: false,
      roundSums: [],
      showNewRoundButton: false,
      showEndGameModal: false,
      totalToSend: [0, 0, 0, 0],
    };
  }

  async componentDidMount() {}

  componentDidUpdate() {
    LayoutAnimation.configureNext(LinearSlideAnimation);
  }

  addPlayer(playa) {
    const {players, lockPlayers, selectedPrice, games} = this.state;
    if (lockPlayers) {
      return;
    }
    let clone = players;
    let found = clone.indexOf(playa);
    if (found < 0) {
      if (clone.length < 4) {
        clone.push(playa);
        this.setState({players: clone});
        if (clone.length === 4 && selectedPrice > 0) {
          Alert.alert('', 'Lock players?', [
            {
              text: 'YES',
              onPress: () => {
                const GAME = [
                  [0, 0, 0, 0],
                  [0, 0, 0, 0],
                  [0, 0, 0, 0],
                  [0, 0, 0, 0],
                ];
                this.setState({
                  lockPlayers: true,
                  members: clone,
                  games: [...games, GAME],
                });
              },
            },
            {
              text: 'NO',
              onPress: () => {
                clone.pop();
                this.setState({players: clone});
              },
            },
          ]);
        }
      }
    } else {
      clone.splice(found, 1);
      this.setState({players: clone});
    }
  }

  selectPrice(price) {
    const {players, games} = this.state;
    this.setState({selectedPrice: price}, () => {
      if (players.length === 4) {
        Alert.alert('', 'Lock players?', [
          {
            text: 'YES',
            onPress: () => {
              const GAME = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
              ];
              this.setState({
                lockPlayers: true,
                members: players,
                games: [...games, GAME],
              });
            },
          },
          {
            text: 'NO',
            onPress: () => {
              const clone = players;
              clone.pop();
              this.setState({players: clone});
            },
          },
        ]);
      }
    });
  }

  async endGame() {
    const {componentId} = this.props;
    const {roundSums, currentRound} = this.state;
    if (currentRound + 1 !== roundSums.length) {
      Alert.alert(
        '',
        'Game not over, end anyway? Will only submit finished games.',
        [
          {
            text: 'YES',
            onPress: async () => {
              await this.calculateSubmission();
              this.setState({showEndGameModal: true});
              // AppActions.dismissModal(componentId);
            },
          },
          {text: 'NO', onPress: () => {}},
        ],
      );
    } else {
      await this.calculateSubmission();
      this.setState({showEndGameModal: true});
      // do database shit...
    }
  }

  async calculateSubmission() {
    const {players, games, roundSums, selectedPrice, totalToSend} = this.state;
    const {setSelectedGame} = this.props;
    const gameHistory = {};
    const today = new Date();
    const currentLocalDate = today.toLocaleDateString();
    gameHistory.players = players;
    gameHistory.date = currentLocalDate;
    gameHistory.rounds = games;
    gameHistory.roundSums = roundSums;
    // members
    // selectedPrice
    // roundSums (array)
    // game
    await setSelectedGame({
      players,
      games,
      roundSums,
      selectedPrice,
    });
  }

  async sendToDB() {
    const {players, games, roundSums, selectedPrice, totalToSend} = this.state;
    const {setSelectedGame} = this.props;
    const gameHistory = {};
    const today = new Date();
    const currentLocalDate = today.toLocaleDateString();
    gameHistory.players = players;
    gameHistory.date = currentLocalDate;
    gameHistory.rounds = games;
    gameHistory.roundSums = roundSums;
    API.sendToDB(
      players,
      selectedPrice,
      games,
      roundSums,
      totalToSend,
      currentLocalDate,
    );
  }

  calculatePoints(player, x, y, isEdit) {
    // console.log(y + 1, isEdit);
    this.setState({
      showModal: true,
      selectedPlayer: player,
      x,
      y,
      isEdit,
    });
  }

  handlePlayerCards(cardsLeft) {
    const {
      selectedPlayer,
      x,
      y,
      currentSet,
      currentSetPlayersAccountedFor,
      isEdit,
      games,
      currentRound,
      selectedPrice,
    } = this.state;
    const clone = games[currentRound];
    let penalty = 0;
    // 1-5 1
    // 6-8  2
    // 9-11 3
    // 12  4
    // 13  5
    if (cardsLeft === 13) {
      penalty = -65;
    } else if (cardsLeft === 12) {
      penalty = -48;
    } else if (cardsLeft < 12 && cardsLeft > 8) {
      penalty = cardsLeft * -1 * 3;
    } else if (cardsLeft < 9 && cardsLeft > 5) {
      penalty = cardsLeft * -1 * 2;
    } else {
      penalty = cardsLeft * -1;
    }
    clone[y][x] = penalty * selectedPrice;
    const account = isEdit
      ? currentSetPlayersAccountedFor
      : currentSetPlayersAccountedFor + 1;

    this.setState({currentSetPlayersAccountedFor: account}, () => {
      if (this.state.currentSetPlayersAccountedFor === 3) {
        for (let i = 0; i < clone[y].length; i++) {
          if (clone[y][i] === 0) {
            let winnings = clone[y].reduce((a, b) => a + b, 0);
            clone[y][i] = winnings * -1;
          }
        }
      }
      this.setState({showModal: false});

      for (let i = 0; i < clone[y].length; i++) {
        if (clone[y][i] === 0) {
          return;
        }
      }
      if (currentSet === y + 1 && !isEdit) {
        this.setState(
          {
            currentSet: currentSet + 1,
            currentSetPlayersAccountedFor: 0,
          },
          () => {
            if (this.state.currentSet === 5) {
              this.handleRoundCalculation();
            }
          },
        );
      }
    });

    if (currentSet !== y + 1 && isEdit) {
      for (let i = 0; i < clone[y].length; i++) {
        if (clone[y][i] > 0) {
          let newWinnings = 0;
          for (let j = 0; j < clone[y].length; j++) {
            if (clone[y][j] < 0) {
              newWinnings += clone[y][j];
            }
          }
          clone[y][i] = newWinnings * -1;
        }
      }
    }
  }

  handleRoundCalculation() {
    const {games, roundSums, currentRound} = this.state;
    let currentRoundSum = [];
    for (let i = 0; i < 4; i++) {
      let playerWinnings = 0;
      for (let j = 0; j < 4; j++) {
        playerWinnings += games[currentRound][j][i];
      }
      currentRoundSum.push(playerWinnings);
    }
    roundSums.push(currentRoundSum);
    this.setState({
      roundSums,
      showNewRoundButton: true,
    });
  }

  addNewRound() {
    const {games, currentRound} = this.state;
    const GAME = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    this.setState({
      games: [...games, GAME],
      showNewRoundButton: false,
      currentRound: currentRound + 1,
      currentSet: 1,
    });
  }

  render() {
    const {
      rounds,
      players,
      priceOptions,
      selectedPrice,
      members,
      lockPlayers,
      currentRound,
      currentSet,
      showModal,
      roundSums,
      games,
      showNewRoundButton,
      showEndGameModal,
    } = this.state;
    const {componentId} = this.props;
    return (
      <View style={styles.content}>
        <View style={{width: WIDTH, height: 50}} />
        {lockPlayers ? (
          <View>
            <Text style={{...nobelBold18}}>GAME STARTED</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignSelf: 'center',
              }}>
              {players.map(player => (
                <PersonCircle
                  name={player}
                  color={green}
                  key={`${player}start`}
                />
              ))}
            </View>
            <Text style={{...nobelBold18, marginTop: 5, color: green}}>
              ${selectedPrice}
              <Text style={{...nobelBold18, marginTop: 5, color: black}}>
                {' '}
                per card
              </Text>
            </Text>
          </View>
        ) : (
          <View>
            <Text style={{...nobelBold18}}>GAME CONFIG</Text>
            <Text style={{...nobelBold12, marginTop: 20}}>1) ADD PLAYERS</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignSelf: 'center',
              }}>
              {members &&
                members.map(player => {
                  const {abrv} = player;
                  if (abrv === undefined) {
                    return (
                      <PersonCircle
                        name={player}
                        color={green}
                        key={`${player}add`}
                      />
                    );
                  }
                  const found = players.includes(abrv);
                  return (
                    <TouchableOpacity
                      onPress={() => this.addPlayer(abrv)}
                      key={`${player.name}add`}>
                      <PersonCircle
                        name={abrv}
                        color={found ? green : 'lightgrey'}
                      />
                    </TouchableOpacity>
                  );
                })}
            </View>
            <Text style={{...nobelBold12, marginTop: 30}}>
              2) DOLLARS PER CARD
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: WIDTH - 60,
                justifyContent: 'space-between',
                alignSelf: 'center',
                marginTop: 20,
              }}>
              {priceOptions.map(dolla => {
                const chosen = selectedPrice === dolla;
                return (
                  <TouchableOpacity
                    onPress={() => this.selectPrice(dolla)}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: chosen ? green : 'lightgrey',
                      marginHorizontal: 2,
                    }}
                    key={`${dolla}priceOpt`}>
                    <Text style={{...nobelBold12}}>${dolla}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
        <View
          style={{
            width: WIDTH,
            backgroundColor: black,
            height: 2,
            marginTop: 20,
          }}
        />
        <ScrollView style={{marginTop: 0}}>
          {games.map((game, i) => {
            return (
              <View key={`round${i}`}>
                <Text style={{...nobelBold18, marginTop: 10}}>
                  ROUND {i + 1}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: WIDTH - 80,
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    marginTop: 20,
                  }}>
                  {players.map((player, x) => {
                    return (
                      <View key={`${player}roundAdd`}>
                        <Text style={{...nobelBold18}}>{player}</Text>
                        {games[i] &&
                          games[i].map((set, y) => {
                            if (y + 1 > currentSet && currentRound === i) {
                              return null;
                            }
                            if (set[x] !== 0) {
                              return (
                                <TouchableOpacity
                                  style={{marginTop: 2}}
                                  key={`${player}${[x]}${[y]}`}
                                  onPress={() =>
                                    this.calculatePoints(player, x, y, true)
                                  }>
                                  <Text
                                    style={{
                                      ...nobelBold18,
                                      color: set[x] > 0 ? green : red,
                                    }}>
                                    {set[x] > 0 ? `+${set[x]}` : set[x]}
                                  </Text>
                                </TouchableOpacity>
                              );
                            }
                            return (
                              <TouchableOpacity
                                style={{marginTop: 2}}
                                onPress={() =>
                                  this.calculatePoints(player, x, y, false)
                                }
                                key={`${player}${[x]}${[y]}`}>
                                <Image
                                  source={AppImages.card}
                                  style={{
                                    width: 40,
                                    height: 40,
                                    resizeMode: 'contain',
                                  }}
                                />
                              </TouchableOpacity>
                            );
                          })}
                      </View>
                    );
                  })}
                </View>
                {lockPlayers && roundSums[i] && roundSums[i].length && (
                  <View>
                    <View
                      style={{
                        width: WIDTH - 80,
                        alignSelf: 'center',
                        backgroundColor: black,
                        height: 1,
                        marginTop: 8,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH - 80,
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                      }}>
                      {roundSums[i].map((profit, m) => {
                        return (
                          <Text
                            style={{
                              ...nobelBold18,
                              color: profit > 0 ? green : red,
                            }}
                            key={`${profit}${i}${m}sums`}>
                            {profit > 0 ? `+${profit}` : profit}
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                )}
              </View>
            );
          })}
          {showNewRoundButton && (
            <Button
              text="NEW ROUND"
              onPress={() => this.addNewRound()}
              textStyle={{fontSize: 12}}
              style={{width: 150, height: 30, marginTop: 10}}
            />
          )}
          <View
            style={{height: 300, width: '100%', backgroundColor: 'white'}}
          />
        </ScrollView>
        <Button
          text="END GAME"
          onPress={() => this.endGame()}
          style={{position: 'absolute', bottom: 40, width: WIDTH - 40}}
        />
        <Modal visible={showModal} transparent animationType="fade">
          <ModalCardsLeft
            close={() => this.setState({showModal: false})}
            setNumber={number => this.handlePlayerCards(number)}
          />
        </Modal>
        <Modal visible={showEndGameModal} transparent animationType="fade">
          <ModalEndGame
            setTotalsToSend={totalToSend => {
              this.setState({totalToSend}, () => this.sendToDB());
            }}
            close={() => {
              this.setState({showEndGameModal: false});
              setTimeout(() => {
                AppActions.dismissModal(componentId);
              }, 750);
            }}
          />
        </Modal>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  ...selectedGameActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalBigTwoRound);

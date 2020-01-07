import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  LayoutAnimation,
  TextInput,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import StyleConfig from '../StyleConfig';
import ROOMDETAILS from '../FAKEDATA.js';
import ModalCardsLeft from './ModalCardsLeft.js';
import ModalEndGame from './ModalEndGame.js';
import AppImages from '../../assets/images/AppImages';
import { Button, Card, PersonCircle } from '../components';
import * as AppActions from '../AppActions.js';
import { selectedGameActions } from '../redux/actions';
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
  blue
} = StyleConfig;

const { members } = ROOMDETAILS;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: black,
    alignSelf: 'center'
  },
  firstTimeSplash: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute'
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

class ModalBigTwoGameHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEndGameModal: false
    };
  }

  async componentDidMount() {
    const { gameState, componentId, setSelectedGame } = this.props;
    const { selectedHistory } = gameState;
    const { games, players, roundResults, wager } = selectedHistory;
    await setSelectedGame({
      players,
      games,
      roundSums: roundResults,
      selectedPrice: wager,
    });
    // API.goThroughGamesAndUpdate(selectedHistory);
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LinearSlideAnimation);
  }

  render() {
    const { showEndGameModal } = this.state;
    const { gameState, componentId } = this.props;
    const { selectedHistory } = gameState;
    const {
      date,
      games,
      players,
      roundResults,
      total,
      wager,
    } = selectedHistory;
    return (
      <View style={styles.content}>
        <View style={{ width: WIDTH, height: 50 }} />
        <Button
          onPress={() => this.setState({ showEndGameModal: true })}
          text={'tally'}
          style={{
            position: 'absolute',
            height: 50,
            width: 50,
            borderRadius: 25,
            top: 50,
            right: 20,
            zIndex: 2
          }}
        />
        <View style={{ zIndex: 1 }}>
          <Text style={{ ...nobelBold18, color: 'white' }}>{date}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignSelf: 'center'
            }}
          >
            {players.map(player => (
              <PersonCircle name={player} color={blue} key={`${player}start`} />
            ))}
          </View>
          <Text style={{ ...nobelBold18, marginTop: 5, color: green }}>
            ${wager}
            <Text style={{ ...nobelBold18, marginTop: 5, color: white }}>
              {' '}
              per card
            </Text>
          </Text>
        </View>
        <View
          style={{
            width: WIDTH,
            backgroundColor: white,
            height: 2,
            marginTop: 20,
          }}
        />
        <ScrollView style={{ marginTop: 0 }}>
          {games.map((game, i) => {
            if (game[0][0] === 0 && game[0][1] === 0) {
              return null;
            }
            return (
              <View key={`round${i}`}>
                <Text style={{ ...nobelBold18, marginTop: 10, color: 'white' }}>
                  ROUND {i + 1}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: WIDTH - 80,
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    marginTop: 20,
                  }}
                >
                  {players.map((player, x) => {
                    return (
                      <View key={`${player}roundAdd`}>
                        <Text style={{ ...nobelBold18, color: 'white' }}>
                          {player}
                        </Text>
                        {games[i] &&
                          games[i].map((set, y) => {
                            if (set[x] !== 0) {
                              return (
                                <View
                                  style={{ marginTop: 2 }}
                                  key={`${player}${[x]}${[y]}`}
                                  onPress={() =>
                                    this.calculatePoints(player, x, y, true)
                                  }
                                >
                                  <Text
                                    style={{
                                      ...nobelBold18,
                                      color: set[x] > 0 ? green : red,
                                    }}
                                  >
                                    {set[x] > 0 ? `+${set[x]}` : set[x]}
                                  </Text>
                                </View>
                              );
                            }
                            return null;
                          })}
                      </View>
                    );
                  })}
                </View>
                {roundResults[i] && roundResults[i].length && (
                  <View>
                    <View
                      style={{
                        width: WIDTH - 80,
                        alignSelf: 'center',
                        backgroundColor: white,
                        height: 1,
                        marginTop: 8,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH - 80,
                        justifyContent: 'space-between',
                        alignSelf: 'center'
                      }}
                    >
                      {roundResults[i].map((profit, m) => {
                        return (
                          <Text
                            style={{
                              ...nobelBold18,
                              color: profit > 0 ? green : red,
                            }}
                            key={`${profit}${i}${m}sums`}
                          >
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
          <View
            style={{ height: 300, width: '100%', backgroundColor: 'black' }}
          />
        </ScrollView>
        <Button
          text="CLOSE"
          onPress={() => AppActions.dismissModal(componentId)}
          style={{ position: 'absolute', bottom: 40, width: WIDTH - 40 }}
        />
        <Modal visible={showEndGameModal} transparent animationType="fade">
          <ModalEndGame
            history={true}
            close={() => {
              this.setState({ showEndGameModal: false });
            }}
          />
        </Modal>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    gameState: state.gameState
  };
}

const mapDispatchToProps = {
  ...selectedGameActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBigTwoGameHistory);

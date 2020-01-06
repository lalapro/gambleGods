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
import * as AppActions from '../AppActions.js';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  ScrollView,
} from 'react-native';
import StyleConfig from '../StyleConfig';
import * as API from '../API.js';
import AppImages from '../../assets/images/AppImages';
import { Button, Card, PersonCircle } from '../components';
import ROOMDETAILS from '../FAKEDATA.js';
import { gameStateActions } from '../redux/actions';

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
  nobelBold22
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
  gameCard: {
    width: WIDTH - 40,
    height: 75,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginVertical: 20,
  },
  menu: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: red,
  },
  tabs1: {
    flex: 1,
    backgroundColor: green,
    justifyContent: 'center'
  },
  tabs2: {
    flex: 1,
    justifyContent: 'center'
  },
  backTouch: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
    justifyContent: 'center'
  }
});

type Props = {};

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

class BigTwo extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const data = await API.getBigTwoData();
    if (data) {
      this.setState({
        history: Object.values(data),
        keys: Object.keys(data)
      });
    }
  }

  componentDidUpdate() {
    // LayoutAnimation.configureNext(LinearSlideAnimation);
  }

  render() {
    const { history, keys } = this.state;
    const { componentId, selectedGame, setGameState } = this.props;
    const { testHistory } = selectedGame;
    // console.log(history);
    return (
      <View style={styles.container}>
        <View style={{ width: '100%', height: 50 }} />
        <TouchableOpacity
          onPress={() => AppActions.popScreen(componentId)}
          style={styles.backTouch}
        >
          <Image
            source={AppImages.back}
            style={{ width: 15, height: 15, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <Text style={styles.roomName}>BIG TWO</Text>
        <ScrollView>
          {history &&
            history.map((game, i) => {
              const { date, players, total, games } = game;
              return (
                <Card
                  mainText={date}
                  players={players}
                  key={keys[i]}
                  total={total}
                  subText={`${games.length} rounds`}
                  onPress={async () => {
                    await setGameState({ selectedHistory: game });
                    AppActions.showModal('ModalBigTwoGameHistory');
                  }}
                />
              );
            })}
          <View
            style={{
              height: 70,
              width: '100%',
              backgroundColor: 'transparent'
            }}
          />
        </ScrollView>
        <Button
          text="ADD NEW GAME"
          onPress={() => AppActions.showModal('ModalAddBigTwoRound')}
          style={{ position: 'absolute', bottom: 40 }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedGame: state.selectedGame,
    gameState: state.gameState
  };
}

const mapDispatchToProps = {
  ...gameStateActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BigTwo);

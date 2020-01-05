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
import {Button, Card, PersonCircle} from '../components';
import ROOMDETAILS from '../FAKEDATA.js';

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
    justifyContent: 'center',
  },
  tabs2: {
    flex: 1,
    justifyContent: 'center',
  },
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
        keys: Object.keys(data),
      });
    }
  }

  componentDidUpdate() {
    // LayoutAnimation.configureNext(LinearSlideAnimation);
  }

  render() {
    const {history, keys} = this.state;
    const {componentId, selectedGame} = this.props;
    const {testHistory} = selectedGame;
    // console.log(history);
    return (
      <View style={styles.container}>
        <View style={{width: '100%', height: 50}} />
        <Text style={styles.roomName}>BIG TWO</Text>
        <ScrollView>
          {history &&
            history.map((game, i) => {
              const {date, players, total} = game;
              return (
                <Card
                  mainText={date}
                  players={players}
                  key={keys[i]}
                  total={total}
                />
              );
            })}
        </ScrollView>
        <Button
          text="ADD NEW GAME"
          onPress={() => AppActions.showModal('ModalAddBigTwoRound')}
          style={{position: 'absolute', bottom: 40}}
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

export default connect(mapStateToProps)(BigTwo);

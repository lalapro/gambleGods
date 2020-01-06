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

class GameDetails extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'History',
    };
  }

  async componentDidMount() {
    // const
    // console.log(this.props.selectedGame)
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LinearSlideAnimation);
  }

  // async fetchRoom() {
  //   let room = await API.checkRoomId('test')
  //   console.log(room)
  //   return room
  // }

  render() {
    const {selectedTab} = this.state;
    const {selectedGame} = this.props;
    const {name, activeMembers, games} = selectedGame;
    return (
      <View style={styles.container}>
        <View style={{width: '100%', height: 50}} />
        <Text style={styles.roomName}>{name}</Text>
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => this.setState({selectedTab: 'History'})}
            style={selectedTab === 'History' ? styles.tabs1 : styles.tabs2}>
            <Text style={{...nobel16}}>HISTORY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({selectedTab: 'Stats'})}
            style={selectedTab === 'Stats' ? styles.tabs1 : styles.tabs2}>
            <Text style={{...nobel16}}>STATS</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{backgroundColor: blue}}>
          {selectedTab === 'History' ? (
            games.map(game => (
              <Card
                onPress={() => {
                  // AppActions.pushScreen(componentId, 'GameDetails')
                }}
                mainText={game.date}
                subText={`$${game.pot}`}
                players={game.players}
                winner={game.winner}
                key={game.date}
              />
            ))
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{...nobel16, marginTop: 20}}>Winnings</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: WIDTH - 40,
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                {activeMembers.map(player => {
                  const {name, buyIns, winnings, abrv} = player;
                  return (
                    <View
                      style={{marginTop: 10, alignItems: 'center'}}
                      key={`$${abrv}deets`}>
                      <View
                        style={{
                          height: 100 * (winnings / 1000),
                          width: 10,
                          backgroundColor: green,
                        }}
                      />
                      <Text style={{marginVertical: 10, ...nobel12}}>
                        ${winnings}
                      </Text>
                      <PersonCircle name={abrv} color={'lightblue'} />
                    </View>
                  );
                })}
              </View>
              <Text style={{...nobel16, marginTop: 20}}>Buy ins</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: WIDTH - 40,
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                {activeMembers.map(player => {
                  const {name, buyIns, winnings, abrv} = player;
                  const profit = winnings - buyIns;
                  return (
                    <View
                      style={{marginTop: 10, alignItems: 'center'}}
                      key={`$${abrv}deets`}>
                      <View
                        style={{
                          height: 100 * (buyIns / 1000),
                          width: 10,
                          backgroundColor: red,
                        }}
                      />
                      <Text style={{marginVertical: 10, ...nobel12}}>
                        ${buyIns}
                      </Text>
                      <PersonCircle name={abrv} color={'lightblue'} />
                    </View>
                  );
                })}
              </View>
              <Text style={{...nobel16, marginTop: 20}}>Net Profit/Loss</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: WIDTH - 40,
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                {activeMembers.map(player => {
                  const {name, buyIns, winnings, abrv} = player;
                  const profit = winnings - buyIns;
                  const color = profit > 0 ? green : red;
                  return (
                    <View
                      style={{marginTop: 10, alignItems: 'center'}}
                      key={`$${abrv}deets`}>
                      <View
                        style={{
                          height: 100 * (profit / 600),
                          width: 10,
                          backgroundColor: color,
                        }}
                      />
                      <Text style={{marginVertical: 10, ...nobel12}}>
                        ${profit}
                      </Text>
                      <PersonCircle name={abrv} color={'lightblue'} />
                      <View
                        style={{
                          height: 100,
                          width: 10,
                          marginTop: 10,
                          backgroundColor: profit > 0 ? 'transparent' : red,
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedGame: state.selectedGame,
  };
}

export default connect(mapStateToProps)(GameDetails);

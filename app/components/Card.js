import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import StyleConfig from '../StyleConfig';
import AppImages from '../../assets/images/AppImages';
import PersonCircle from './PersonCircle';

const {
  WIDTH,
  blue,
  white,
  grey2,
  red,
  green,
  purple,
  nobel12,
  nobel22,
  dollyReg16,
} = StyleConfig;

const styles = StyleSheet.create({
  card: {
    width: WIDTH - 40,
    height: 75,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginVertical: 20,
  },
  header: {
    ...nobel22,
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'left',
  },
  num: {
    ...nobel12,
    marginLeft: 10,
    textAlign: 'left',
  },
});

export default class Card extends Component {
  render() {
    const {onPress, mainText, subText, players, winner} = this.props;
    // console.log(players)
    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Text style={styles.header}>{mainText}</Text>
        <Text style={styles.num}>{subText}</Text>
        {players && (
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 0,
              bottom: 0,
            }}>
            {players.map(player => (
              <PersonCircle
                winner={winner}
                name={player.abrv ? player.abrv : player}
                key={`$${player.abrv ? player.abrv : player}card`}
              />
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

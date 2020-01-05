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
  nobelBold14,
} = StyleConfig;

const styles = StyleSheet.create({
  card: {
    width: WIDTH - 40,
    height: 75,
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 20,
    justifyContent: 'space-between',
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
    const {onPress, mainText, players, total, subText} = this.props;
    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View>
          <Text style={styles.header}>{mainText}</Text>
          <Text style={styles.num}>{subText}</Text>
        </View>
        {players && (
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 0,
              top: 10,
            }}>
            {players.map((player, i) => (
              <View
                key={`$${player.abrv ? player.abrv : player}card`}
                style={{
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                }}>
                <PersonCircle
                  winner={total[i] > 0}
                  name={player.abrv ? player.abrv : player}
                />
                <Text
                  style={{
                    ...nobelBold14,
                    color: total[i] > 0 ? green : red,
                  }}>
                  {total[i]}
                </Text>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import StyleConfig from '../StyleConfig';
import AppImages from '../../assets/images/AppImages';

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
  nobel10,
} = StyleConfig;

const styles = StyleSheet.create({
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginHorizontal: 2,
  },
  wonProfile: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    marginHorizontal: 2,
  },
  name: {
    ...nobel10,
    textAlign: 'left',
  },
  num: {
    ...nobel12,
    marginLeft: 10,
    textAlign: 'left',
  },
});

export default class PersonCircle extends Component {
  render() {
    const {name, winner, color} = this.props;
    const won = winner && winner.abrv === name;
    return (
      <View
        style={
          won
            ? styles.wonProfile
            : [styles.profile, {backgroundColor: color ? color : 'red'}]
        }>
        <Text style={styles.name}>{name}</Text>
      </View>
    );
  }
}

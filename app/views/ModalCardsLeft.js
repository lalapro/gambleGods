import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import StyleConfig from '../StyleConfig';
import {Button} from '../components';
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
  nobelBold18,
} = StyleConfig;

const styles = StyleSheet.create({
  content: {
    width: WIDTH - 100,
    height: 450,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginTop: 100,
    alignSelf: 'center',
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

export default class ModalCardsLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      selectedCard: 0,
    };
  }

  handleSomething(card) {
    const {close, setNumber} = this.props;
    setNumber(card);
    close();
  }

  render() {
    const {cards, selectedCard} = this.state;
    const {close} = this.props;
    return (
      <View style={styles.content}>
        <Text style={{...nobelBold18, marginTop: 5}}>Cards Left:</Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {cards.map(card => {
            const chosen = selectedCard === card;
            return (
              <TouchableOpacity
                onPress={() => this.handleSomething(card)}
                key={`${card}left`}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: chosen ? green : 'lightgrey',
                  margin: 5,
                }}>
                <Text>{card}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Button
          onPress={close}
          text={'DISMISS'}
          style={{position: 'absolute', bottom: 20}}
        />
      </View>
    );
  }
}

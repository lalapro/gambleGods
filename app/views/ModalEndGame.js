import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import StyleConfig from '../StyleConfig';
import {Button, Card, PersonCircle} from '../components';
import * as AppActions from '../AppActions.js';
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
import {connect} from 'react-redux';
import {selectedGameActions} from '../redux/actions';

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

class ModalEndGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totals: [0, 0, 0, 0],
    };
  }

  componentDidMount() {
    this.calculateWinningsForPlayer();
  }

  calculateWinningsForPlayer() {
    const {selectedGame, setTotalsToSend} = this.props;
    const {players, games, roundSums} = selectedGame;
    let totals = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      let total = 0;
      for (let j = 0; j < roundSums.length; j++) {
        total += parseInt(roundSums[j][i]);
      }
      totals[i] = total;
    }
    setTotalsToSend(totals);
    this.setState({totals});
  }

  render() {
    const {totals} = this.state;
    const {close, selectedGame} = this.props;
    const {players, games, roundSums} = selectedGame;
    return (
      <View style={styles.content}>
        <Text style={{...nobelBold18, marginTop: 20, marginBottom: 10}}>
          GAME ENDED!
        </Text>
        {players &&
          players.map((player, i) => {
            return (
              <View
                style={{flexDirection: 'row', alignItems: 'center'}}
                key={`${player}end`}>
                <PersonCircle name={player} color={green} />
                <Text
                  style={{
                    ...nobelBold18,
                    color: totals[i] > 0 ? green : red,
                  }}>
                  {totals[i] > 0 ? `+${totals[i]}` : totals[i]}
                </Text>
              </View>
            );
          })}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <Button
          onPress={close}
          text={'DISMISS'}
          style={{position: 'absolute', bottom: 20}}
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

const mapDispatchToProps = {
  ...selectedGameActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalEndGame);

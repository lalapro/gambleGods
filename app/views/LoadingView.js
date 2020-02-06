import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Alert,
  Linking,
  PushNotificationIOS,
} from 'react-native';
import {connect} from 'react-redux';
import codePush from 'react-native-code-push';
import * as AppActions from '../AppActions.js';
import {gameStateActions} from '../redux/actions';
import * as API from '../API.js';

import StyleConfig from '../StyleConfig';

const {WIDTH, HEIGHT} = StyleConfig;

class LoadingView extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      codePushProgressPercentage: 0,
      showError: false,
    };
  }

  componentDidMount() {
    // console.log('mount');
    this.checkCodePushSuccess();
  }

  loadDataForApp = async () => {
    const {setGameState} = this.props;
    const users = await API.getAllUsers();
    let newUsers = Object.values(users).sort(
      (a, b) => a.totalWinnings > b.totalWinnings,
    );
    console.log(newUsers);
    if (users) {
      setGameState({users});
    }
    AppActions.startHome();
  };

  checkCodePushSuccess = async () => {
    try {
      codePush.checkForUpdate().then(
        update => {
          // console.log('update..', update && !update.failedInstall);
          if (update && !update.failedInstall) {
            this.handleUpdate();
          } else {
            codePush.notifyApplicationReady();
            this.loadDataForApp();
            // this.loadDataForApp();
          }
        },
        err => {
          console.log('error 1', err);
          this.loadDataForApp();
        },
      );
    } catch (e) {
      this.loadDataForApp();
      console.log('error', e);
    }
  };

  handleUpdate() {
    const {componentId} = this.props;
    codePush
      .sync(
        {
          updateDialog: false,
          installMode: codePush.InstallMode.IMMEDIATE,
        },
        undefined,
        progress => this.handleUpdateProgress(progress),
      )
      .then(() => {
        codePush.notifyApplicationReady();
      })
      .catch(e => {
        if (e) {
          setTimeout(() => this.handleUpdate(), 500);
        }
      });
  }

  handleUpdateProgress(progress) {
    const codePushProgressPercentage =
      progress.receivedBytes / progress.totalBytes;
    this.setState({codePushProgressPercentage});
  }

  renderProgressBars() {
    const {codePushProgressPercentage} = this.state;
    const full = WIDTH * 0.7;
    const percentage = full * codePushProgressPercentage;
    if (codePushProgressPercentage > 0) {
      return (
        <View style={{position: 'absolute', width: WIDTH, height: HEIGHT}}>
          <View
            style={[
              styles.progressBar,
              {width: full, backgroundColor: '#424242'},
            ]}
          />
          <View style={[styles.progressBar, {width: percentage}]} />
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        {this.renderProgressBars()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progressBar: {
    position: 'absolute',
    top: HEIGHT * 0.59,
    left: WIDTH * 0.15,
    borderRadius: 3.5,
    height: 4,
    backgroundColor: 'rgba(255, 0, 255, 1)',
  },
});

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  ...gameStateActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadingView);

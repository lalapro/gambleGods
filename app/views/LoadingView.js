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

  checkCodePushSuccess = async () => {
    try {
      codePush.checkForUpdate().then(
        update => {
          console.log('update..', update && !update.failedInstall);
          if (update && !update.failedInstall) {
            this.handleUpdate();
          } else {
            AppActions.startHome();
            // this.loadDataForApp();
          }
        },
        err => {
          console.log('error 1', err);
          AppActions.startHome();
        },
      );
    } catch (e) {
      AppActions.startHome();
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadingView);

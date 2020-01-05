import React from 'react';
import Home from './app/views/Home';
import GameDetails from './app/views/GameDetails';
import BigTwo from './app/views/BigTwo';
import LoadingView from './app/views/LoadingView';
import ModalAddBigTwoRound from './app/views/ModalAddBigTwoRound';
import ModalEndGame from './app/views/ModalEndGame';
import {Navigation} from 'react-native-navigation';
import store from './app/redux/store';
import {Provider} from 'react-redux';
import AppImages from './assets/images/AppImages';

console.disableYellowBox = true;

const IPHONEX = true;

const ICONINSETS = {
  top: IPHONEX ? 12 : 6,
  left: 0,
  bottom: IPHONEX ? -12 : -6,
  right: 0,
};

Navigation.registerComponent(
  'Home',
  () => props => (
    <Provider store={store}>
      <Home {...props} />
    </Provider>
  ),
  () => Home,
);

Navigation.registerComponent(
  'GameDetails',
  () => props => (
    <Provider store={store}>
      <GameDetails {...props} />
    </Provider>
  ),
  () => GameDetails,
);

Navigation.registerComponent(
  'LoadingView',
  () => props => (
    <Provider store={store}>
      <LoadingView {...props} />
    </Provider>
  ),
  () => LoadingView,
);

Navigation.registerComponent(
  'BigTwo',
  () => props => (
    <Provider store={store}>
      <BigTwo {...props} />
    </Provider>
  ),
  () => BigTwo,
);

Navigation.registerComponent(
  'ModalAddBigTwoRound',
  () => props => (
    <Provider store={store}>
      <ModalAddBigTwoRound {...props} />
    </Provider>
  ),
  () => ModalAddBigTwoRound,
);

Navigation.registerComponent(
  'ModalEndGame',
  () => props => (
    <Provider store={store}>
      <ModalEndGame {...props} />
    </Provider>
  ),
  () => ModalEndGame,
);

// Navigation.registerComponentWithRedux('app.Home', () => Home, Provider, store);
// Navigation.registerComponentWithRedux('app.GameDetails', () => GameDetails, Provider, store);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      height: 0,
    },
    layout: {
      orientation: ['portrait'],
    },
    bottomTabs: {
      backgroundColor: 'white',
    },
    // animations: !ANDROID ? {} : {
    //   push: {
    //     content: {
    //       x: {
    //         from: 2000,
    //         to: 0,
    //         duration: 400,
    //       }
    //     }
    //   },
    //   pop: {
    //     content: {
    //       x: {
    //         from: 0,
    //         to: 2000,
    //         duration: 500,
    //       },
    //     }
    //   }
    // }
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: 'LoadingView',
              name: 'LoadingView',
            },
          },
        ],
      },
    },
  });
  // Navigation.setRoot({
  //     root: {
  //       id: 'BottomTabs',
  //       topBar: {
  //         visible: false,
  //         height: 0
  //       },
  //       statusBar: {
  //         visible: true,
  //       },
  //       animations: {
  //         dismissModal: {
  //           enabled: false
  //         }
  //       },
  //       bottomTabs: {
  //         visible: false,
  //         options: {
  //           bottomTabs: {
  //             animate: false,
  //             titleDisplayMode: 'alwaysHide'
  //           },
  //         },
  //         children: [{
  //           stack: {
  //             children: [{ component: { name: 'Home', id: 'Home' } }],
  //             options: {
  //               bottomTab: {
  //                 animate: false,
  //                 icon: AppImages.test1,
  //                 testID: 'FIRST_TAB_BAR_BUTTON',
  //                 selectedColor: 'white',
  //                 iconInsets: ICONINSETS
  //               }
  //             }
  //           }
  //         },
  //         // {
  //         //   stack: {
  //         //     children: [{ component: { name: 'Home', id: 'Home' } }],
  //         //     options: {
  //         //       bottomTab: {
  //         //         icon: AppImages.test2,
  //         //         testID: 'SECOND_TAB_BAR_BUTTON',
  //         //         disableIconTint: true,
  //         //         disableSelectedIconTint: true,
  //         //         iconInsets: ICONINSETS
  //         //       }
  //         //     }
  //         //   }
  //         // },
  //         // {
  //         //   stack: {
  //         //     children: [{ component: { name: 'Home', id: 'Home' } }],
  //         //     options: {
  //         //       bottomTab: {
  //         //         icon: AppImages.test3,
  //         //         testID: 'SECOND_TAB_BAR_BUTTON',
  //         //         selectedColor: 'white',
  //         //         iconInsets: ICONINSETS
  //         //       }
  //         //     }
  //         //   }
  //         // },
  //         ]
  //       }
  //     }
  //   });
});

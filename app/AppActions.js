import { Navigation } from 'react-native-navigation';

export function pushScreen(currentScreen, newScreen, options = {}) {
  if (!currentScreen) {
    return;
  }
  Navigation.push(currentScreen, {
    component: {
      name: newScreen,
      id: newScreen,
    },
  });
}

export function popScreen(currentScreen) {
  Navigation.pop(currentScreen);
}

export function showModal(screen) {
  Navigation.showModal({
    component: {
      name: screen,
      id: screen,
      options: {
        layout: { backgroundColor: 'transparent' },
        modalPresentationStyle: 'fullScreen'
      },
    },
  });
}

export function startHome() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: 'Home',
              name: 'Home'
            },
          },
        ],
      },
    },
  });
}

export function startLobby() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: 'Lobby',
              name: 'Lobby'
            },
          },
        ],
      },
    },
  });
}

export function dismissModal(componentId) {
  Navigation.dismissModal(componentId);
}

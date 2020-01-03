import { Navigation } from 'react-native-navigation';

export function pushScreen(currentScreen, newScreen, options = {}) {
  if (!currentScreen) return;
  Navigation.push(currentScreen, {
    component: {
      name: newScreen,
      id: newScreen,
    }
  });
}

export function showModal(screen) {
  Navigation.showModal({
    component: {
      name: screen,
      id: screen,
      options: {
        layout: { backgroundColor: 'transparent' },
        modalPresentationStyle: 'fullScreen',
      },
    },
  });
}

export function dismissModal(componentId) {
  Navigation.dismissModal(componentId);
}

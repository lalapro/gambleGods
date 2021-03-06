import database from '@react-native-firebase/database';

const userRef = database().ref('users');

export async function onStartUp() {
  database().setPersistenceEnabled(true);
  database().setPersistenceCacheSizeBytes(2000000);
}

export async function sendToDB(players, wager, games, results) {
  database()
    .ref('bigTwo')
    .push({
      players,
      wager,
      games,
      results,
    });
}

export async function addGameDataToDB() {
  database()
    .ref('bigTwo')
    .push({
      players: ['JY', 'SX', 'MT', 'PC'],
      test: 'jj',
    });
}

export async function checkRoomId(name) {
  let a = function() {
    setTimeout(() => {
      return true;
    }, 2000);
  };
  await a();
  return a;
}

// const CONFIG = {
//   url: 'https://euw1.api.riotgames.com/lol',
//   champ_url: 'https://ddragonexplorer.com/cdn/img/champion/tiles/',
//   api_key: `RGAPI-0cee52a2-eefa-43b6-80d3-1a3e15fbcd30`
// }
//
//
// export async function getSummonerByName(name) {
//   console.log(name)
//   try {
//     let response = await fetch(`${CONFIG.url}/summoner/v4/summoners/by-name/${name}?api_key=${CONFIG.api_key}`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//     })
//     if (response.status === 200) {
//       response = await response.text()
//       response = JSON.parse(response)
//       dispatch(setSummoner({ ...response }))
//       return response
//     } else {
//       response = await response.text()
//       response = JSON.parse(response)
//       console.log(response)
//       return false
//     }
//   } catch (er) {
//     console.log(er)
//     return false
//   }
// }
//
// export async function getSummonerActiveGame(encryptedSummonerId) {
//   try {
//     let response = await fetch(`${CONFIG.url}/spectator/v4/active-games/by-summoner/${encryptedSummonerId}?api_key=${CONFIG.api_key}`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//     })
//     console.log(response)
//     if (response.status === 200) {
//       response = await response.text()
//       response = JSON.parse(response)
//       dispatch(setMatch({ ...response }))
//       return response
//     } else {
//       response = await response.text()
//       response = JSON.parse(response)
//       console.log(response)
//       return false
//     }
//   } catch (er) {
//     console.log(er)
//     return false
//   }
// }
//
// export async function testchamp(encryptedSummonerId, championId) {
//   // /lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}
//   try {
//     let response = await fetch(`${CONFIG.url}/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}/by-champion/${championId}?api_key=${CONFIG.api_key}`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//     })
//     console.log(response)
//     if (response.status === 200) {
//       response = await response.text()
//       response = JSON.parse(response)
//       console.log(response)
//       // dispatch(setMatch({ ...response }))
//       return response
//     } else {
//       response = await response.text()
//       response = JSON.parse(response)
//       console.log(response)
//       return false
//     }
//   } catch (er) {
//     console.log(er)
//     return false
//   }
// }
//
// export function fetchChampTile(champ) {
//   // https://ddragonexplorer.com/cdn/img/champion/tiles/Aatrox_0.jpg
//   return `${CONFIG.champ_url}/${champ}_0.jpg`
// }

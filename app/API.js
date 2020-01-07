import database from '@react-native-firebase/database';

const userRef = database().ref('users');

export async function onStartUp() {
  database().setPersistenceEnabled(true);
  database().setPersistenceCacheSizeBytes(2000000);
}

// {"date": "1/5/2020",
// "games": [[[Array], [Array], [Array], [Array]]],
// "players": ["JY", "BH", "SX", "JC"],
// "roundResults": [[-122, 268, -202, 56]],
// "total": [-122, 268, -202, 56],
// "wager": 2}

// [[[44, -14, -16, -14], [-5, 33, -16, -12], [-4, 22, -16, -2], [-4, -3, 12, -5]], [[28, -12, -2, -14], [3, -1, -1, -1], [7, -1, -4, -2], [-12, 21, -4, -5]]]
export async function goThroughGamesAndUpdate(data) {
  const { players, games, roundResults, total } = data;
  console.log(games);
  const flattenedGames = [].concat.apply([], games);
  const snapshot = await database()
    .ref('users')
    .once('value');
  if (snapshot._snapshot) {
    const users = snapshot._snapshot.value;
    for (let key in users) {
      let abrv = users[key].abrv;
      const index = players.indexOf(abrv);
      if (index > -1) {
        let currentGames = 0;
        let currentGamesWon = 0;
        let bestGameWin = users[key].stats.bigTwo.bestGameWin;
        for (let i = 0; i < flattenedGames.length; i++) {
          const gameValue = flattenedGames[i][index];
          currentGames++;
          // if (abrv === 'GJ') {
          //   console.log(gameValue);
          // }
          if (gameValue > 0) {
            currentGamesWon++;
            if (gameValue > bestGameWin) {
              bestGameWin = gameValue;
            }
          }
        }

        let currentRoundsWon = 0;
        let bestRoundWin = users[key].stats.bigTwo.bestRoundWin;
        for (let i = 0; i < roundResults.length; i++) {
          const roundValue = roundResults[i][index];
          if (roundValue > 0) {
            currentRoundsWon++;
          }
          if (roundValue > bestRoundWin) {
            bestRoundWin = roundValue;
          }
        }

        let bestSessionWin = users[key].stats.bigTwo.bestSessionWin;
        let sessionValue = total[index];
        if (sessionValue > bestSessionWin) {
          bestSessionWin = sessionValue;
        }

        const newGamesWon = (users[
          key
        ].stats.bigTwo.gamesWon += currentGamesWon);
        const newRoundsWon = (users[
          key
        ].stats.bigTwo.roundsWon += currentRoundsWon);
        const newTotalGames = (users[
          key
        ].stats.bigTwo.totalGames += currentGames);

        database()
          .ref('users/' + key + '/stats/bigTwo')
          .set({
            totalGames: newTotalGames > 0 ? newTotalGames : 0,
            gamesWon: newGamesWon > 0 ? newGamesWon : 0,
            roundsWon: newRoundsWon > 0 ? newRoundsWon : 0,
            bestRoundWin: bestRoundWin > 0 ? bestRoundWin : 0,
            bestSessionWin: bestSessionWin > 0 ? bestSessionWin : 0,
            bestGameWin: bestGameWin > 0 ? bestGameWin : 0
          });

        // database()
        //   .ref('users/' + key + '/stats/bigTwo')
        //   .set({
        //     totalGames: 0,
        //     gamesWon: 0,
        //     roundsWon: 0,
        //     bestRoundWin: 0,
        //     bestSessionWin: 0,
        //     bestGameWin: 0
        //   });
      }
    }
  }
}

export async function sendToDB(
  players,
  wager,
  games,
  roundResults,
  total,
  date
) {
  const snapshot = await database()
    .ref('users')
    .once('value');
  if (snapshot._snapshot) {
    const users = snapshot._snapshot.value;
    for (let key in users) {
      let abrv = users[key].abrv;
      const index = players.indexOf(abrv);
      if (index > -1) {
        const newTotalWinnings = (users[key].totalWinnings += total[index]);
        const newBigTwoWinnings = (users[key].bigTwoWinnings += total[index]);
        database()
          .ref('users/' + key)
          .update({
            totalWinnings: newTotalWinnings,
            bigTwoWinnings: newBigTwoWinnings,
          });

        const flattenedGames = [].concat.apply([], games);
        let currentGames = 0;
        let currentGamesWon = 0;
        let bestGameWin = users[key].stats.bigTwo.bestGameWin;
        for (let i = 0; i < flattenedGames.length; i++) {
          const gameValue = flattenedGames[i][index];
          currentGames++;
          // if (abrv === 'GJ') {
          //   console.log(gameValue);
          // }
          if (gameValue > 0) {
            currentGamesWon++;
            if (gameValue > bestGameWin) {
              bestGameWin = gameValue;
            }
          }
        }

        let currentRoundsWon = 0;
        let bestRoundWin = users[key].stats.bigTwo.bestRoundWin;
        for (let i = 0; i < roundResults.length; i++) {
          const roundValue = roundResults[i][index];
          if (roundValue > 0) {
            currentRoundsWon++;
          }
          if (roundValue > bestRoundWin) {
            bestRoundWin = roundValue;
          }
        }

        let bestSessionWin = users[key].stats.bigTwo.bestSessionWin;
        let sessionValue = total[index];
        if (sessionValue > bestSessionWin) {
          bestSessionWin = sessionValue;
        }

        const newGamesWon = (users[
          key
        ].stats.bigTwo.gamesWon += currentGamesWon);
        const newRoundsWon = (users[
          key
        ].stats.bigTwo.roundsWon += currentRoundsWon);
        const newTotalGames = (users[
          key
        ].stats.bigTwo.totalGames += currentGames);

        database()
          .ref('users/' + key + '/stats/bigTwo')
          .set({
            totalGames: newTotalGames > 0 ? newTotalGames : 0,
            gamesWon: newGamesWon > 0 ? newGamesWon : 0,
            roundsWon: newRoundsWon > 0 ? newRoundsWon : 0,
            bestRoundWin: bestRoundWin > 0 ? bestRoundWin : 0,
            bestSessionWin: bestSessionWin > 0 ? bestSessionWin : 0,
            bestGameWin: bestGameWin > 0 ? bestGameWin : 0
          });
        // database()
        //   .ref('users/' + key + '/stats/bigTwo')
        //   .update({
        //     totalGames: newTotalWinnings,
        //     winnings: ,
        //     gamesWon: ,
        //     roundsWon: newBigTwoWinnings,
        //   });
      }
    }
  }
  database()
    .ref('bigTwo')
    .push({
      players,
      wager,
      games,
      roundResults,
      total,
      date,
    });
}

export async function getAllLobbies() {
  const snapshot = await database()
    .ref('lobby')
    .orderByKey()
    .limitToFirst(50)
    .once('value');
  if (snapshot._snapshot) {
    let array = [];
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      array.push(childData);
    });
    return array.reverse();
  } else {
    return false;
  }
}

export async function getBigTwoData() {
  const snapshot = await database()
    .ref('bigTwo')
    .orderByKey()
    .limitToFirst(50)
    .once('value');
  if (snapshot._snapshot) {
    let array = [];
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      array.push(childData);
    });
    return array.reverse();
  } else {
    return false;
  }
}

export async function getAllUsers() {
  const snapshot = await database()
    .ref('users')
    .once('value');
  if (snapshot._snapshot) {
    return snapshot._snapshot.value;
  } else {
    return false;
  }
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

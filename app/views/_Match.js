// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  * @lint-ignore-every XPLATJSCOPYRIGHT1
//  */
//
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
// import StyleConfig from '../StyleConfig'
// import * as API from '../API.js'
// import AppImages from '../../assets/images/AppImages'
// import { Button } from '../components'
// import CHAMPIONS from '../Champs'
//
// const {
//   WIDTH,
//   blue,
//   white,
//   grey2,
//   red,
//   green,
//   nobel16
// } = StyleConfig
//
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     width: '100%',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: green,
//     padding: 20,
//     flexDirection: 'row'
//   },
//   half: {
//     backgroundColor: white,
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     alignItems: 'center'
//   },
//   teamHeader: {
//     ...StyleConfig.nobelBold18,
//     textDecorationLine: 'underline',
//     marginBottom: 20
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: 10
//   },
//   champTile: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain'
//   },
//   info: {
//     marginLeft: 10,
//     alignItems: 'flex-start'
//   },
//   summonerName: {
//     ...StyleConfig.nobel12,
//     textAlign: 'left'
//   },
//   champName: {
//     ...StyleConfig.nobel12,
//     textAlign: 'left'
//   }
// });
//
// type Props = {};
//
// class Match extends Component<Props> {
//   constructor(props) {
//     super(props)
//     this.state = {
//     }
//   }
//
//   componentDidMount() {
//     // console.log(CHAMPS[79])
//   }
//
//   _fetchSummonerInfo = async () => {
//
//   }
//
//   render() {
//     const { storage, match } = this.props
//     return (
//       <View style={styles.container}>
//         <View style={styles.half}>
//           <Text style={styles.teamHeader}>BLUE</Text>
//           {match.participants.map(player => {
//             const { championId, summonerId, summonerName } = player
//             if (player.teamId === 100) {
//               let champ = CHAMPIONS[championId].name
//               if (champ === `Cho'Gath`) {
//                 champ = 'Chogath'
//               } else if (champ === `Rek'Sai`) {
//                 champ = 'RekSai'
//               }
//               return (
//                 <View style={styles.row} key={summonerId}>
//                   <Image
//                     source={{ uri: API.fetchChampTile(champ) }}
//                     style={styles.champTile}
//                   />
//                   <View style={styles.info}>
//                     <Text style={styles.summonerName}>
//                       {summonerName}
//                     </Text>
//                     <Text style={styles.champName}>
//                       {champ}
//                     </Text>
//                   </View>
//                 </View>
//               )
//             }
//           })}
//         </View>
//         <View style={styles.half}>
//           <Text style={styles.teamHeader}>RED</Text>
//           {match.participants.map(player => {
//             const { championId, summonerId, summonerName } = player
//             if (player.teamId === 200) {
//               let champ = CHAMPIONS[championId].name
//               if (champ === `Cho'Gath`) {
//                 champ = 'Chogath'
//               } else if (champ === `Rek'Sai`) {
//                 champ = 'RekSai'
//               }
//               return (
//                 <View style={styles.row} key={summonerId}>
//                   <Image
//                     source={{ uri: API.fetchChampTile(champ) }}
//                     style={styles.champTile}
//                   />
//                   <View style={styles.info}>
//                     <Text style={styles.summonerName}>
//                       {summonerName}
//                     </Text>
//                     <Text style={styles.champName}>
//                       {champ}
//                     </Text>
//                   </View>
//                 </View>
//               )
//             }
//           })}
//         </View>
//       </View>
//     );
//   }
// }
//
//
// function mapStateToProps(state) {
//   return {
//     summoner: state.summoner,
//     match: state.match
//   };
// }
//
// export default connect(mapStateToProps)(Match);



{/* <View style={styles.field}>
	<TextInput
		// onFocus={() => this.setState({ firstClear: true })}
		onChangeText={(summonerName) => {
			this.setState({ summonerName, firstClear: true, noActiveGame: false })
		}}
		numberOfLines={1}
		autoCorrect={false}
		autoCapitalize='none'
		underlineColorAndroid='transparent'
		selectionColor={StyleConfig.black}
		style={{height: '100%', width: '100%'}}>
		<Text allowFontScaling={false} style={styles.text}>
			{summonerName}
		</Text>
	</TextInput>
	{!!firstClear && (
		<TouchableOpacity
			onPress={() => {
				this.setState({ summonerName: '', firstClear: false })
			}}
			style={styles.clearTouchArea}
			>
			<Image source={AppImages.clearWhite} style={styles.clearWhite}/>
		</TouchableOpacity>
	)}
</View>
<Button
	style={{ marginVertical: 20, width: 250, backgroundColor: buttonColor }}
	onPress={this._fetchSummonerInfo}
	disabled={summonerName.length < 1}
	text={statusText}
/>
{gameFound && <Match/>} */}

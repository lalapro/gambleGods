// render() {
// 	const {
// 		rounds,
// 		players,
// 		priceOptions,
// 		selectedPrice,
// 		members,
// 		lockPlayers,
// 		currentRound,
// 		currentSet,
// 		showModal,
// 		roundSums,
// 		games
// 	} = this.state;
// 	console.log(roundSums[currentRound - 1])
// 	return (
// 		<View style={styles.content}>
// 			<View style={{ width: WIDTH, height: 50 }}/>
// 			{lockPlayers ? (
// 				<View>
// 					<Text style={{...nobelBold18}}>
// 						GAME STARTED
// 					</Text>
// 					<View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
// 						{players.map((player) => (
// 							<PersonCircle name={player} color={green} key={`${player}start`}/>
// 						))}
// 					</View>
// 					<Text style={{...nobelBold18, marginTop: 5, color: green}}>
// 						${selectedPrice}
// 						<Text style={{...nobelBold18, marginTop: 5, color: black}}>
// 							 {" "}per card
// 						</Text>
// 					</Text>
// 				</View>
// 			) : (
// 				<View>
// 					<Text style={{...nobelBold18}}>
// 						GAME CONFIG
// 					</Text>
// 					<Text style={{...nobelBold12, marginTop: 20 }}>
// 						1) ADD PLAYERS
// 					</Text>
// 					<View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'center' }}>
// 						{members && members.map((player) => {
// 							const { abrv } = player;
// 							if (abrv === undefined) {
// 								return (
// 									<PersonCircle name={player} color={green} key={`${player}add`}/>
// 								)
// 							}
// 							const found = players.includes(abrv)
// 							return (
// 								<TouchableOpacity
// 									onPress={() => this.addPlayer(abrv)}
// 									key={`${player.name}add`}
// 									>
// 									<PersonCircle name={abrv} color={found ? green : 'lightgrey'}/>
// 								</TouchableOpacity>
// 							)
// 						})}
// 					</View>
// 					<Text style={{...nobelBold12, marginTop: 30 }}>
// 						2) DOLLARS PER CARD
// 					</Text>
// 					<View style={{
// 						flexDirection: 'row',
// 						width: WIDTH - 60,
// 						justifyContent: 'space-between',
// 						alignSelf: 'center',
// 						marginTop: 20
// 					}}>
// 						{priceOptions.map((dolla) => {
// 							const chosen = selectedPrice === dolla
// 							return (
// 								<TouchableOpacity
// 									onPress={() => this.selectPrice(dolla)}
// 									style={{
// 										width: 60,
// 										height: 60,
// 										borderRadius: 30,
// 										alignItems: 'center',
// 										justifyContent: 'center',
// 										backgroundColor: chosen ? green : 'lightgrey',
// 										marginHorizontal: 2
// 									}}
// 									key={`${dolla}priceOpt`}
// 									>
// 										<Text style={{...nobelBold12}}>
// 											${dolla}
// 										</Text>
// 								</TouchableOpacity>
// 							)
// 						})}
// 					</View>
// 				</View>
// 			)}
// 			<View style={{ width: WIDTH, backgroundColor: black, height: 2, marginTop: 20 }}/>
// 			<Text style={{...nobelBold18, marginTop: 10}}>
// 				ROUND {currentRound + 1}
// 			</Text>
// 			<View style={{
// 				flexDirection: 'row',
// 				width: WIDTH - 80,
// 				justifyContent: 'space-between',
// 				alignSelf: 'center',
// 				marginTop: 20
// 			}}>
// 				{players.map((player, x) => {
// 					return (
// 						<View key={`${player}roundAdd`}>
// 							<Text style={{...nobelBold18}}>
// 								{player}
// 							</Text>
// 							{lockPlayers && games.map((game, i) => {
// 								return (
// 									<View>
// 										{game.map((set, y) => {
// 											if (y + 1 > currentSet) return null
// 											if (set[x] !== 0) {
// 												return (
// 													<TouchableOpacity
// 														style={{ marginTop: 2}}
// 														key={`${player}${[x]}${[y]}`}
// 														onPress={() => this.calculatePoints(player, x, y, true)}
// 														>
// 														<Text style={{...nobelBold18, color: set[x] > 0 ? green : red }}>
// 															{set[x] > 0 ? `+${set[x]}` : set[x] }
// 														</Text>
// 													</TouchableOpacity>
// 												)
// 											}
// 											return (
// 												<TouchableOpacity
// 													style={{ marginTop: 2}}
// 													onPress={() => this.calculatePoints(player, x, y, false)}
// 													key={`${player}${[x]}${[y]}`}
// 													>
// 													<Image
// 														source={AppImages.card}
// 														style={{
// 															width: 40, height: 40, resizeMode: 'contain'
// 														}}/>
// 												</TouchableOpacity>
// 											)
// 										})}
// 									</View>
// 								)
// 							})}
// 						</View>
// 					)
// 				})}
// 			</View>
// 			{lockPlayers && roundSums[0] && roundSums[0].length && (
// 				<View>
// 					<View style={{ width: WIDTH - 80, alignSelf: 'center', backgroundColor: black, height: 1, marginTop: 8 }}/>
// 					<View style={{
// 						flexDirection: 'row',
// 						width: WIDTH - 80,
// 						justifyContent: 'space-between',
// 						alignSelf: 'center'
// 					}}>
// 						{roundSums[0].map(profit => {
// 							return (
// 								<Text style={{
// 									...nobelBold18,
// 									color: profit > 0 ? green : red
// 								}} key={`${profit}sums`}>
// 									{profit}
// 								</Text>
// 							)
// 						})}
// 					</View>
// 				</View>
// 			)}
// 			<ScrollView style={{ marginTop: 0 }}>
// 				<View>
//
// 				</View>
// 			</ScrollView>
// 			<Button
// 				text="END GAME"
// 				onPress={() => this.endGame()}
// 				style={{ position: 'absolute', bottom: 40, width: WIDTH - 40}}
// 			/>
// 			<Modal visible={showModal} transparent animationType="fade">
// 				<ModalCardsLeft
// 					close={() => this.setState({ showModal: false })}
// 					setNumber={(number) => this.handlePlayerCards(number)}/>
// 			</Modal>
// 		</View>
// 	);
// }
// }

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { GameCard,GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';
import { API_URL } from '../../utils/API';

export const Home = () => {
	const [games, setGames] = useState<GameCardProps[]>([]);
	const navigation = useNavigation();
	
	const handleOpenGame = ({ title, id, bannerUrl }:GameCardProps) => {
			navigation.navigate("game",{ title, id, bannerUrl })
	}

	useEffect(() => {
		fetch(API_URL+"/games").then(response => response.json()).then(data => { 
			setGames(data) 
		})
	},[])

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<Image source={logoImg} style={styles.logo} />
				<Heading title={'Encontre seu duo'} subtitle={'Selecione o game que deseja jogar...'} />
				<FlatList
					data={games}
					keyExtractor={item => item.id }
					renderItem= {({item}) => (
						<GameCard
							data={item} 
							onPress={() => handleOpenGame(item) }	
						/>
					)}
					contentContainerStyle= {styles.contentList}
					showsHorizontalScrollIndicator= {false}
					showsVerticalScrollIndicator = {false}
					horizontal
				/>
			</SafeAreaView>
		</Background>
	);
}
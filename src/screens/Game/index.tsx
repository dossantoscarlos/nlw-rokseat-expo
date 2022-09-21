import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { GameParams } from '../../@types/navigation';
import { View,Text, TouchableOpacity, Image, FlatList } from 'react-native';
import {Entypo} from '@expo/vector-icons'
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { DuoCard,DuoCardProps } from '../../components/DuoCard';
import { API_URL } from '../../utils/API';
import { useEffect, useState } from 'react';
import { DuoMatch } from '../../components/DuoMatch';
import axios from 'axios';

export function Game () {
  const route = useRoute();
  const [duos , setDuos] = useState<DuoCardProps[]>([]);
  const [discordSelected , setDiscordSelected] = useState<string>('')
  const game = route.params as GameParams;
  const navigation = useNavigation();
  const handleGoBack = () => navigation.goBack();
  
  const gameList = async () => {
   await axios(API_URL+`/games/${game.id}/ads`)
    .then(response => setDuos(response.data))
  }

  const getDiscordUser = async (adsId: string) => {

     await axios(API_URL+`/ads/${adsId}/discord`)
     .then(response => setDiscordSelected(response.data.discord));
     console.log('DISCORD SELECIONADO => ',discordSelected);
  }

	useEffect(() => {
     gameList();
     
  },[])
  
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image
            source={logoImg}
            style={styles.logo}
          />
          <View style={styles.right}/> 
        </View>
        <Image
          source={{uri: game.bannerUrl}} 
          style={styles.cover}
          resizeMode={"cover"}
        />
        <Heading 
           title={game.title.trim()}
           subtitle='Conecte-se e comece a jogar'
          />
         <FlatList
          data={duos}
          horizontal
          contentContainerStyle={[duos.length === 0 ? styles.containerListEmpty : styles.flatList]}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          keyExtractor = {item => item.id }
          renderItem = {({item}) => (
            <DuoCard 
              data={item} 
              onConnect={()=> getDiscordUser(item.id)}
              /> )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Não há anúncios publicados ainda.</Text>
          )}
        /> 
        <DuoMatch
          discord={discordSelected}
          onClose={() => setDiscordSelected('')}
          visible={discordSelected.length > 0 } /> 
      </SafeAreaView>
    </Background>
  );
}
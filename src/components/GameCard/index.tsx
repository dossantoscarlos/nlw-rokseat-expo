import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, ImageSourcePropType, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

export interface GameCardProps {
  id: string;
  title:string;
  _count:{
    ads:number
  };
  bannerUrl:string 
}

interface Props  extends TouchableOpacityProps{
  data:GameCardProps;
}

export const GameCard = ({ data, ...rest }:Props) => (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.cover}
        source={{uri: data.bannerUrl }}
      >
      <LinearGradient
				colors={THEME.COLORS.FOOTER}
				style={styles.footer}
			>
       <Text style={styles.name}>{data.title.trim()}</Text>
       <Text style={styles.ads}>
        {data._count.ads} anúncios
       </Text>
			</LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
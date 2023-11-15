import React from 'react';
import { View, Text } from 'react-native';
import { CircleFade } from 'react-native-animated-spinkit';

import styles from './styles';

const Loader = ({ loadingText }) => (
  <View style={styles.loader}>
    <CircleFade size={48} color="black" />
    <Text style={styles.loaderText}>{loadingText}</Text>
  </View>
);

export default Loader;

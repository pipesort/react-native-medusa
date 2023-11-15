import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const BackButton = ({ navigation, screen, title }) => (
  <View style={styles.backArrow}>
    <TouchableOpacity
      style={styles.content}
      onPress={() => navigation.navigate(screen)}
    >
      <Icon name="arrow-back" color="gray" size={25} style={styles.arrow} />
      <View style={styles.titleContainer}>
        <Text style={styles.header}>{title}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export const IOSBackButton = ({ title, onPress }) => (
  <View style={styles.backArrow}>
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <Icon name="arrow-back" color="gray" size={25} style={styles.arrow} />
      <View style={styles.titleContainer}>
        <Text style={styles.header}>{title}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export const AndroidBackButton = ({ title, onPress }) => (
  <View style={styles.backArrow}>
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <Icon name="arrow-back" color="gray" size={25} style={styles.arrow} />
      <View style={styles.titleContainer}>
        <Text style={styles.header}>{title}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default BackButton;

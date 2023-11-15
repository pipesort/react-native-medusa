import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const SectionTitle = ({title, navigation, navigateTo}: any) => (
  <View style={styles.heading}>
    <Text style={styles.link}>{title}</Text>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(navigateTo, {
          product: {},
        })
      }>
      <View style={styles.shopAllContainer}>
        <Text style={styles.shopAllLink}>SHOP ALL</Text>
        <Icon
          name="chevron-forward-outline"
          color="#FDB927"
          size={20}
          style={styles.filterIcon}
        />
      </View>
    </TouchableOpacity>
  </View>
);
export default SectionTitle;

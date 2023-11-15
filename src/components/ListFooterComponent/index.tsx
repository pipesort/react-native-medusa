import React from 'react';
import { Text, ActivityIndicator } from 'react-native';

import styles from './styles';

const ListFooterComponent = ({ loading, hasNextPage, noOfItems }) => {
  if (loading) {
    return <ActivityIndicator size="large" color="#ff0000" />;
  }

  if (noOfItems > 0 && !hasNextPage) {
    return <Text style={styles.endOfList}>No more products</Text>;
  }

  return null;
};

export default ListFooterComponent;

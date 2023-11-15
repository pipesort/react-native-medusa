import React from 'react';
import { View, StatusBar, SafeAreaView, FlatList } from 'react-native';

import debounce from 'lodash/debounce';
import EmptyProductLoadingSkeleton from '@app/components/EmptyProductLoadingSkeleton';
import ListFooterComponent from '@app/components/ListFooterComponent';
import { useCollections } from '@app/hooks/useCollections';
import getCollectionsConstants from '@app/utils/getCollectionsConstants';
import Product from '../Product';
import styles from './styles';

const Collection = ({ navigation, route }) => {
  const { NO_OF_PRODUCTS_TO_GET, ON_END_REACHED_THRESHOLD } =
    getCollectionsConstants({ route });

  const screenName = route.name;

  const {
    collection,
    isLoading: areMoreProductsLoading,
    loadMoreProducts,
    hasNextPage,
  } = useCollections({
    initialLimit: NO_OF_PRODUCTS_TO_GET,
    screenName,
  });

  const debouncedOnEndReached = debounce(() => {
    if (hasNextPage && !areMoreProductsLoading) {
      loadMoreProducts();
    }
  }, 500);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <FlatList
          contentContainerStyle={styles.body}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          data={collection}
          renderItem={({ item, index }) => (
            <Product
              item={item}
              navigation={navigation}
              type="Collection"
              key={`${item.id}+${index}`}
            />
          )}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()} // Ensure your items have unique IDs
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<EmptyProductLoadingSkeleton />}
          ListFooterComponent={
            <ListFooterComponent
              loading={areMoreProductsLoading}
              noOfItems={collection.length}
              hasNextPage={hasNextPage}
            />
          }
          onEndReached={debouncedOnEndReached}
          onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
        />
      </SafeAreaView>
    </View>
  );
};

export default Collection;

import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';

import Loader from '@app/components/Loader';

import useGetCustomerOrders from '@app/hooks/useGetCustomerOrders';
import styles from './styles';

const OrdersHistory = ({ navigation }) => {
  const [customerAccessToken, setCustomerAccessToken] = useState(null);

  const { orders, loading } = useGetCustomerOrders();

  const orderDetails =
    orders &&
    orders.map((order, index) => ({
      orderNumber: index,
      orderedOn: order.created_at,
      orderStatus: order.fulfillment_status,
      totalProducts: order.items.length,
      price: order.total,
    }));

  // const getCondition = condition => condition.toUpperCase();

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader loadingText="Getting your orders..." />
      ) : (
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          {orderDetails && orderDetails.length > 0 ? (
            <>
              {orderDetails.map((node, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <View style={styles.productContainer} key={index}>
                  <View style={styles.productDescriptionContainer}>
                    <Text style={styles.orderDescription}>
                      ORDER NUMBER#:{' '}
                      <Text style={styles.span}>{node.orderNumber}</Text>
                    </Text>
                    <Text style={styles.orderDescription}>
                      TOTAL PRODUCTS:{' '}
                      <Text style={styles.span}>{node.totalProducts}</Text>
                    </Text>
                    <Text style={styles.orderDescription}>
                      DATE ORDERED:{' '}
                      <Text style={styles.span}>
                        {node.orderedOn.split('', 9)}
                      </Text>
                    </Text>
                    <Text style={styles.orderDescription}>
                      ORDER STATUS:{' '}
                      <Text style={styles.productStatusDescription}>
                        {node.orderStatus}
                      </Text>
                    </Text>
                    <Text style={styles.orderDescription}>
                      PRICE:
                      <Text style={styles.productDescription}>
                        $ {node.price}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.addressContainer}>
                    {/* <View style={styles.productImage}>
                      <ImagePlaceholder src={node.image} />
                    </View> */}
                  </View>
                </View>
              ))}
              <View style={styles.noMoreOrders}>
                <Text style={styles.noOrdersText}>No More Orders</Text>
              </View>
            </>
          ) : (
            <View style={styles.noOrdersContainer}>
              <View style={styles.subAddressContainer}>
                <Text style={styles.noOrdersTitle}>YOU HAVE NO ORDERS YET</Text>
              </View>
              {/* <View styles={styles.addressBtnsContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate(SCREENS.MOST_POPULAR, {
                      screen: [SCREENS.ORDERS_HISTORY],
                      product: {
                        querySortkey: 'BEST_SELLING',
                        reverse: false,
                      },
                    })
                  }>
                  <Text style={styles.buttonTitle}>VIEW POPULAR PRODUCTS</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default OrdersHistory;

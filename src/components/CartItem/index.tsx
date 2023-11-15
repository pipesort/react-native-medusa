import { View, Text, Image } from 'react-native';
import { useState } from 'react';
import Button from '../Button';

import styles from './styles';

const CartItem = ({ product, deleteCartItem }) => {
  const [productData, setProductData] = useState(product);

  return (
    <View style={styles.container}>
      <Image source={{ uri: productData.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <View>
          <Text style={styles.title}>{productData.title}</Text>
          <Text style={styles.description}>
            {productData.description} • ${productData.unit_price / 100}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>${productData.total / 100}</Text>
          <Text style={styles.quantity}>x{productData.quantity}</Text>
        </View>
        <Button
          onPress={() => {
            deleteCartItem(product.cart_id, product.id);
          }}
          title="delete"
        />
      </View>
    </View>
  );
};

export default CartItem;

//Used external library code to replicate required scroll functionality with additional behaviour
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');
const rowItems = 5;

import styles from './styles';
import {hasNotch} from 'react-native-device-info';

class HorizontalScrollPicker extends Component {
  constructor(props: any) {
    super(props);

    const size = width / this.props.rowItems;

    this.state = {
      size,
      selected: props.initialIdx,
    };

    this.scrollView = null;
    this.scrollOffset = 0;
    this.isParking = false;
  }

  _calculateLayout = event => {
    const {size, selected} = this.state;
    this.scrollView?.scrollTo({
      x: selected * size,
      y: 0,
      animated: false,
    });
  };

  _renderItem = (item, idx) => {
    const {size, selected} = this.state;
    const {itemStyle, textStyle, selectedTextStyle, onSelect, items} =
      this.props;

    const {label, value, isAvailable} = item;

    const customItem =
      Platform.OS === 'ios' ? {...styles.item} : {...styles.item, height: 50};

    return (
      <TouchableOpacity
        key={`item-${idx}-${value}`}
        style={[
          styles.itemContainer,
          {
            width: size,
            position: 'relative',
          },
          itemStyle,
        ]}
        onPress={() => {
          this.scrollView?.scrollTo({
            x: value * size,
            y: 0,
            animated: false,
          });
        }}>
        <Text
          style={[
            customItem,
            textStyle,
            selected == idx && selectedTextStyle,
            selected === idx && {borderColor: 'transparent'},
            // {
            //   textDecorationLine: isAvailable ? "none" : "line-through",
            // },
            {
              color: isAvailable ? 'black' : 'gray',
              position: 'relative',
            },
          ]}>
          {label}
        </Text>
        {/*Add line through on outof stock sizes manually to increase the thickness of the line because react native does not support css textDecorationThickness*/}
        {!isAvailable && (
          <View
            style={{
              top: Platform.OS === 'ios' ? (hasNotch() ? 19.5 : 18) : 18,
              borderBottomColor: 'gray',
              borderBottomWidth: 2,
              position: 'absolute',
              width: 15,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  _handleScroll = event => {
    this.scrollOffset = event.nativeEvent.contentOffset.x;
  };

  _handleParking = () => {
    const {size} = this.state;
    const {onSelect, items} = this.props;

    this.isParking = true;

    setTimeout(() => {
      if (this.isParking) {
        const selected = this._selectItem();
        this.setState({
          selected,
        });
        this.isParking = false;
        this.scrollView?.scrollTo({y: 0, x: size * selected, animated: true});
        onSelect(items[selected]);
      }
    }, 150);
  };

  _cancelParking = () => {
    this.isParking = false;
  };

  _selectItem = () => {
    const {items, onSelect} = this.props;
    const {size} = this.state;

    const idx = Math.abs(Math.round(this.scrollOffset / size));
    const selected = idx === items.length ? idx - 1 : idx;

    this.setState({
      selected,
    });

    onSelect(items[selected]);
    return selected;
  };

  render() {
    const {items, rowItems, containerStyle, selectorStyle} = this.props;
    const {size, selected} = this.state;

    const sideItems = (rowItems - 1) / 2;

    return (
      <View
        style={[
          styles?.timelineContainer,
          {width: rowItems * size},
          containerStyle,
        ]}>
        <View
          style={[
            styles?.selectedItem,
            {
              left: sideItems * size,
              width: size,
            },
            selectorStyle,
          ]}
        />
        <ScrollView
          horizontal
          ref={ref => (this.scrollView = ref)}
          showsHorizontalScrollIndicator={false}
          onLayout={this._calculateLayout}
          snapToInterval={size}
          onTouchEnd={this._scrollParking}
          onScroll={this._handleScroll}
          onTouchEnd={this._handleParking}
          onScrollEndDrag={this._handleParking}
          scrollEventThrottle={16}
          onMomentumScrollBegin={this._cancelParking}
          onMomentumScrollEnd={this._selectItem}
          shouldCancelWhenOutside={false}
          contentContainerStyle={{
            paddingLeft: size * sideItems,
            paddingRight: size * sideItems,
          }}>
          {items.map((item, idx) => this._renderItem(item, idx))}
        </ScrollView>
      </View>
    );
  }
}

HorizontalScrollPicker.propTypes = {
  rowItems: PropTypes?.number,
  containerStyle: ViewPropTypes?.style,
  itemStyle: ViewPropTypes?.style,
  selectorStyle: ViewPropTypes?.style,
  textStyle: Text.propTypes?.style,
  selectedTextStyle: Text.propTypes?.style,
  items: PropTypes?.array,
  onSelect: PropTypes?.func?.isRequired,
  initialIdx: PropTypes?.number?.isRequired,
};

HorizontalScrollPicker.defaultProps = {
  rowItems: rowItems,
  items: [],
  initialIdx: 0,
};

export default HorizontalScrollPicker;

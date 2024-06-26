import React, { useState, useContext } from 'react';
import { View} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Informations from './Informations';
import Account from './Account';
import { colors } from '../../Config/theme/colors';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../Authsrc/src/contexts/AuthContext';

const renderScene = SceneMap({
  first: Informations,
  second: Account,
});

const TabBarComponent = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.tertiary }}
    labelStyle={{ fontWeight: 'bold' }}
  />
);

const TabViews = () => {
  // Theme colors
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Informations' },
    { key: 'second', title: 'Account' },
  ]);

  const renderTabBar = (props) => (
    <TabBarComponent
      {...props}
      style={{ backgroundColor: activeColors.bgcolor }}
      indicatorStyle={{ backgroundColor: colors.tertiary }}
      activeColor={activeColors.TextColor}
      inactiveColor={activeColors.TextColor}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default TabViews;

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Context for Scroll Direction ---
type ScrollDirection = 'up' | 'down';
interface ScrollContextType {
  scrollDirection: ScrollDirection;
  setScrollDirection: (direction: ScrollDirection) => void;
}
const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('up');
  return (
    <ScrollContext.Provider value={{ scrollDirection, setScrollDirection }}>
      {children}
    </ScrollContext.Provider>
  );
};

// --- Icon Assets ---
// NOTE: Make sure you have these images in your assets folder
const icons = {
  hops: require('../../assets/images/hops.png'),
  home: require('../../assets/images/home.png'),
  menu: require('../../assets/images/menu.png'),
  tonight: require('../../assets/images/ticket.png'),
  account: require('../../assets/images/account.png'),
};

// --- Custom Animated Tab Bar ---
const AnimatedTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { scrollDirection } = useScroll();
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Animate tab bar visibility based on scroll direction
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: scrollDirection === 'down' ? 120 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [scrollDirection]);

  const onHopsPress = () => navigation.navigate('hops');

  // Get the index of the currently active tab
  const activeTabIndex = state.index;

  return (
    <Animated.View style={[styles.tabBarWrapper, { transform: [{ translateY: slideAnim }] }]}>
      {/* Main Tab Bar Container with Blur View */}
      <View style={styles.tabBarContainer}>
        <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.tabBar}>
          {/* Left side tabs */}
          <View style={styles.sideContainer}>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('index')}>
              <Image
                source={icons.home}
                style={[styles.tabIcon, { tintColor: activeTabIndex === 0 ? '#FFFFFF' : '#8A8A8E' }]}
              />
              {/* --- ADDED --- Text label for the Home icon */}
              <Text style={[styles.tabLabel, { color: activeTabIndex === 0 ? '#FFFFFF' : '#8A8A8E' }]}>
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('menu')}>
              <Image
                source={icons.menu}
                style={[styles.tabIcon, { tintColor: activeTabIndex === 1 ? '#FFFFFF' : '#8A8A8E' }]}
              />
              {/* --- ADDED --- Text label for the Menu icon */}
              <Text style={[styles.tabLabel, { color: activeTabIndex === 1 ? '#FFFFFF' : '#8A8A8E' }]}>
                Menu
              </Text>
            </TouchableOpacity>
          </View>

          {/* Spacer for the central 'Hops' button */}
          <View style={styles.hopsSpacer} />

          {/* Right side tabs */}
          <View style={styles.sideContainer}>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('tonight')}>
              <Image
                source={icons.tonight}
                style={[styles.tabIcon, { tintColor: activeTabIndex === 3 ? '#FFFFFF' : '#8A8A8E' }]}
              />
              {/* --- ADDED --- Text label for the Tonight icon */}
              <Text style={[styles.tabLabel, { color: activeTabIndex === 3 ? '#FFFFFF' : '#8A8A8E' }]}>
                Tonight
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('account')}>
              <Image
                source={icons.account}
                style={[styles.tabIcon, { tintColor: activeTabIndex === 4 ? '#FFFFFF' : '#8A8A8E' }]}
              />
              {/* --- ADDED --- Text label for the Account icon */}
              <Text style={[styles.tabLabel, { color: activeTabIndex === 4 ? '#FFFFFF' : '#8A8A8E' }]}>
                Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Central 'Hops' Button */}
      <View style={styles.hopsButtonWrapper}>
        <TouchableOpacity onPress={onHopsPress} style={styles.hopsButton}>
          <Image source={icons.hops} style={styles.hopsIcon} />
        </TouchableOpacity>
        {/* --- MODIFIED --- Renamed style from tabBarLabel to hopsLabel for clarity */}
        <Text style={styles.hopsLabel}>Hops</Text>
      </View>
    </Animated.View>
  );
};

// --- Tabs Layout Definition ---
const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <AnimatedTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="menu" options={{ title: 'Menu' }} />
      <Tabs.Screen name="hops" options={{ title: 'Hops' }} />
      <Tabs.Screen name="tonight" options={{ title: 'Tonight' }} />
      <Tabs.Screen name="account" options={{ title: 'Account' }} />
      <Tabs.Screen name="event-details" options={{ href: null }} />
    </Tabs>
  );
};

// --- Main Layout Component with Provider ---
export default function LayoutWithProvider() {
  return (
    <ScrollProvider>
      <TabLayout />
    </ScrollProvider>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70, 
    zIndex: 100,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 20,
    left: 20,
    right: 20,
    height: 65,
    borderRadius: 35,
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
  },
  hopsSpacer: {
    width: 80,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  // --- MODIFIED --- Renamed from 'tabBarLabel' to 'hopsLabel' for clarity
  hopsLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 4,
  },
  // --- ADDED --- New style for the text labels under the regular tab icons
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  hopsButtonWrapper: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -34 }],
    bottom: Platform.OS === 'ios' ? 42 : 32,
    alignItems: 'center',
    zIndex: 1,
  },
  hopsButton: {
    width: 68,
    height: 68,
    backgroundColor: '#8c3ef0',
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8c3ef0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 12,
    borderWidth: 4,
    borderColor: '#34313D',
  },
  hopsIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
});
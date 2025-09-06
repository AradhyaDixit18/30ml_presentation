import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../../assets/ticket.jpeg'),
    title: 'One pass.\nMany venues',
    subtitle: 'Redeemable anywhere,\nany-day, anytime',
    hasSparkles: true,
    gradient: {
      colors: ['#2A203A', '#3E305F', '#1C1623'] as const,
      locations: [0, 0.5, 1] as const,
    },
  },
  {
    id: '2',
    image: require('../../assets/ramen.jpeg'),
    title: 'Discounts\non F&B',
    subtitle: 'Redeemable anywhere,\nany-day, anytime',
    hasSparkles: false,
    gradient: {
      colors: ['#1C1623', '#4A2534', '#1C1623'] as const,
      locations: [0.1, 0.7, 1] as const,
    },
  },
  {
    id: '3',
    image: require('../../assets/qr.jpeg'),
    title: 'No PR,\nJust QR',
    subtitle: 'Redeemable anywhere,\nany-day, anytime',
    hasSparkles: false,
    gradient: {
      colors: ['#1C1623', '#8C7853', '#1C1623'] as const,
      locations: [0.1, 0.8, 1] as const,
    },
  },
];

const Sparkle = ({ style }: { style: object }) => (
  <Text style={[styles.sparkle, style]}>✨</Text>
);

const OnboardingItem = ({ item }: { item: typeof slides[0] }) => {
  return (
    <View style={styles.slideContainer}>
      <LinearGradient
        colors={item.gradient.colors}
        locations={item.gradient.locations}
        style={styles.slideCard}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <View style={styles.imageContainer}>
          {item.hasSparkles && (
            <>
              <Sparkle style={{ top: '10%', left: '5%' }} />
              <Sparkle style={{ top: '60%', right: '5%', fontSize: 20 }} />
            </>
          )}
          <Image source={item.image} style={styles.image} resizeMode="contain" />
        </View>
      </LinearGradient>
    </View>
  );
};

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex });
    } else {
      router.replace('/(auth)/login');
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient 
        colors={['#2A203A', '#161622', '#161622']} 
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        contentContainerStyle={{ height: height * 0.85 }}
      />
      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    justifyContent: 'flex-end',
  },
  slideContainer: {
    width: width,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  slideCard: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    padding: 20,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  textContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    lineHeight: 60,
  },
  subtitle: {
    fontSize: 18,
    color: '#A9A9A9',
    marginTop: 20,
    textAlign: 'left',
    lineHeight: 24,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  sparkle: {
    position: 'absolute',
    fontSize: 30,
    zIndex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#555',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#6A4DFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

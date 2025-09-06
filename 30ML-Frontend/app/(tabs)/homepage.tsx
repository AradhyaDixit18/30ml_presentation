import { Chivo_700Bold } from '@expo-google-fonts/chivo';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef } from 'react'; // --- MODIFIED --- Import useRef
import {
  Dimensions,
  FlatList,
  Image, // --- ADDED --- For scroll event type
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

// --- ADDED --- Import the useScroll hook from your layout file
import { useScroll } from './_layout';

const { width, height } = Dimensions.get('window');
const cardWidth = width * 0.7;
const cardHeight = cardWidth * 1.4;
const cardSpacing = 12;
const carouselPadding = (width - cardWidth) / 2;

// --- (rest of your imports and constants remain the same) ---
const logoImage = require('../../assets/images/logo.png');
const event1Image = require('../../assets/images/event1.png');
const event2Image = require('../../assets/images/event2.png');
const event3Image = require('../../assets/images/event3.png');
const rewardImage = require('../../assets/images/reward.png');
const bestintownImage = require('../../assets/images/bestintown.png');
const ladiesImage = require('../../assets/images/ladies.png');
const arrowRightIconImage = require('../../assets/images/arrowIcon.png');
const arrowIcon2 = require('../../assets/images/arrowIcon2.png');
const arrowIcon3 = require('../../assets/images/arrowIcon3.png');
const searchIcon = require('../../assets/images/searchIcon.png');
const clubPlaceholder1 = require('../../assets/images/clubs.png');
const clubPlaceholder2 = require('../../assets/images/club2.png');
const clubPlaceholder3 = require('../../assets/images/club3.png');
const calendarIcon = require('../../assets/images/calendarIcon.png');
const freeshotsIcon = require('../../assets/images/freeshotsIcon.png');

interface FeaturedEvent {
  id: string;
  title: string;
  day: string;
  date: string;
  venue: string;
  image: any;
  tag: string;
  freebies: string;
  count: string;
}

const featuredEvents: FeaturedEvent[] = [
    { id: '1', title: 'SUMMER Party', day: 'FRI', date: '28 JUNE', venue: 'Kitty Ko • 7 pm onwards', image: event1Image, tag: 'REGULAR DJ NIGHTS', freebies: 'FREE shots for ladies', count: '+2' },
    { id: '2', title: 'Neon Night', day: 'SAT', date: '29 JUNE', venue: 'Mistique • 8 pm onwards', image: event2Image, tag: 'SPECIAL EVENT', freebies: 'Get 1+1 on drinks', count: '+3' },
    { id: '3', title: 'Groove Gala', day: 'SUN', date: '30 JUNE', venue: 'Lord of Drinks • 9 pm onwards', image: event3Image, tag: 'WEEKEND BASH', freebies: 'VIP entry', count: '+1' },
];

const clubs = [
    { id: '1', name: 'Kitty Ko', location: 'Indiranagar', image: clubPlaceholder1, tag: 'FREE shots', cost: '₹₹₹' },
    { id: '2', name: 'Mystique', location: 'Koramangala', image: clubPlaceholder2, tag: '1+1 on drinks', cost: '₹₹₹' },
    { id: '3', name: 'Loft 38', location: 'Indiranagar', image: clubPlaceholder3, tag: 'Happy Hours', cost: '₹₹' },
];

const watchEvents = [
    { id: '1', title: 'A Night In Mykonos', image: ladiesImage, venue: 'DJ Dr. Preksha @ Kitty Ko', time: 'FRI, 25 APR', heat: 100, offer: 'Upto 40% off', more: '+2 more' },
    { id: '2', title: 'Ladies Night Out', image: ladiesImage, venue: 'Club Mystique', time: 'SAT, 26 APR', heat: 100, offer: 'Upto 50% off', more: '+3 more' },
];

const thisWeekEvents = [
    { id: '1', title: 'DJ Earth & Mars', festival: 'Prime Friday Festival', image: event1Image, location: 'Kitty Ko', time: 'Fri, 25 Apr', tags: ['FREE shots for ladies', 'Get 1+1 on drinks'] },
    { id: '2', title: 'DJ Camaro & DJ ROBO', festival: 'Summer Slammer Party', image: event2Image, location: 'Kitty Ko', time: 'Fri, 25 Apr', tags: ['FREE shots for ladies', 'Get 1+1 on drinks'] },
];

interface FeaturedCardProps {
  item: FeaturedEvent;
  index: number;
  scrollX: SharedValue<number>;
}

// --- (FeaturedCard component remains the same) ---
const FeaturedCard = ({ item, index, scrollX }: FeaturedCardProps) => {
    const animatedStyle = useAnimatedStyle(() => {
      const cardCenter = index * (cardWidth + cardSpacing);
      const distance = scrollX.value - cardCenter;
      const normalizedDistance = distance / (cardWidth + cardSpacing);
  
      const scale = Math.max(0.8, 1 - Math.abs(normalizedDistance) * 0.2);
      const rotation = normalizedDistance * 5;
      const rotateY = normalizedDistance * 10;
      const translateY = Math.abs(normalizedDistance) * 30;
      const translateX = normalizedDistance * 20;
      const opacity = Math.max(0.8, 1 - Math.abs(normalizedDistance) * 0.3);
  
      return {
        transform: [
          { perspective: 1000 },
          { translateX },
          { translateY },
          { scale },
          { rotateZ: `${-rotation}deg` },
          { rotateY: `${rotateY}deg` }
        ],
        opacity,
        zIndex: Math.round(scale * 100)
      };
    });
  
    return (
      <Animated.View style={[styles.animatedCardWrapper, animatedStyle]}>
        <TouchableOpacity activeOpacity={0.9} style={styles.featureCard} onPress={() => router.push('/event-details')}>
          <Image source={item.image} style={styles.featureImage} />
  
          <BlurView intensity={50} tint="dark" style={styles.freebiesTag}>
            <Image source={freeshotsIcon} style={styles.freebiesIcon} />
            <Text style={styles.freebiesText}>{item.freebies}</Text>
          </BlurView>
          <BlurView intensity={50} tint="dark" style={styles.countTag}>
            <Text style={styles.countText}>{item.count}</Text>
          </BlurView>
  
          <View style={styles.dateBanner}>
              <Text style={styles.dateBannerDay}>{item.day}</Text>
              <Text style={styles.dateBannerDate}>{item.date}</Text>
          </View>
  
          <View style={styles.cardBottomWrapperFeature}>
            <Image source={item.image} style={styles.blurredBgImage} blurRadius={20} />
            <LinearGradient
              colors={['rgba(43, 43, 43, 0.4)', 'rgba(43, 43, 43, 0.9)']}
              style={styles.featureCardBottom}
            >
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Text style={styles.tag}>{item.tag}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.sub}>{item.venue}</Text>
              </View>
              <View style={[styles.arrowIconContainer, { alignSelf: 'flex-end' }]}>
                  <Image source={arrowRightIconImage} style={styles.arrowIcon} />
              </View>
            </LinearGradient>
          </View>
  
        </TouchableOpacity>
      </Animated.View>
    );
  };

export default function HomePage() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold, Chivo_700Bold });
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => { scrollX.value = event.contentOffset.x; });

  // --- ADDED --- Logic for tracking scroll direction
  const { setScrollDirection } = useScroll();
  const lastOffsetY = useRef(0);
  const SCROLL_THRESHOLD = 10; // To prevent hiding on minor scrolls

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const difference = currentOffsetY - lastOffsetY.current;

    if (Math.abs(difference) > SCROLL_THRESHOLD) {
      if (difference > 0) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
    }

    lastOffsetY.current = currentOffsetY;
  };
  // --- END ADDED ---

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['rgba(255, 48, 127, 0.5)', '#161622']} style={styles.backgroundGradient} start={{x: 0.5, y: 0}} end={{x: 0.5, y: 0.3}}/>
      
      {/* --- MODIFIED --- Changed ScrollView to Animated.ScrollView and added scroll handler */}
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 120 }}
        onScroll={handleScroll} // Use the new handler
        scrollEventThrottle={16} // Important for performance
      >
        <View style={styles.header}>
            {/* --- (Header content remains the same) --- */}
            <View style={styles.headerTopRow}>
            <Image source={logoImage} style={styles.logo} />
            <TouchableOpacity style={styles.rewardButton}>
              <Image source={rewardImage} style={styles.rewardIcon} />
            </TouchableOpacity>
          </View>
          <BlurView intensity={50} tint="dark" style={styles.searchBarWrapper}>
            <View style={styles.searchBarContainer}>
              <Image source={searchIcon} style={styles.searchIcon} />
              <TextInput placeholder="Search for Events" placeholderTextColor="#999" style={styles.searchBar} />
            </View>
          </BlurView>
        </View>

        {/* --- (Rest of your page content remains the same) --- */}
        <Animated.FlatList data={featuredEvents} horizontal keyExtractor={(item) => item.id} showsHorizontalScrollIndicator={false} style={styles.slider} renderItem={({ item, index }) => <FeaturedCard item={item} index={index} scrollX={scrollX} />} onScroll={onScroll} contentContainerStyle={styles.carouselContainer} snapToInterval={cardWidth + cardSpacing} decelerationRate="fast" scrollEventThrottle={16} />

        <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Clubs to Explore</Text>
            <TouchableOpacity><Text style={styles.exploreButtonText}>Explore all</Text></TouchableOpacity>
        </View>
        <FlatList data={clubs} horizontal keyExtractor={(item) => item.id} showsHorizontalScrollIndicator={false} style={styles.horizontalList} contentContainerStyle={{ paddingHorizontal: 20 }} renderItem={({ item }) => (
            <TouchableOpacity style={styles.clubCard}>
                <Image source={item.image} style={styles.clubImage} />
                <BlurView intensity={50} tint="dark" style={styles.clubTag}>
                    <Image source={freeshotsIcon} style={styles.tagIcon} />
                    <Text style={styles.clubTagText}>{item.tag}</Text>
                </BlurView>
                <View style={styles.cardBottomWrapper}>
                    <Image source={item.image} style={styles.blurredBgImage} blurRadius={20} />
                    <LinearGradient colors={['rgba(3,3,3,0.7)', 'rgba(75,75,75,0.8)', '#2B2B2B']} style={styles.clubCardContent} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                        <View>
                            <View style={styles.clubNameRow}>
                                <Text style={styles.clubName}>{item.name}</Text>
                                <Text style={styles.clubCost}>{item.cost}</Text>
                            </View>
                            <Text style={styles.clubLocation}>{item.location}</Text>
                        </View>
                        <View style={styles.clubArrow}>
                            <Image source={arrowIcon3} style={styles.clubArrowIcon} />
                        </View>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        )} />

        <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Events to watch out for</Text>
            <TouchableOpacity><Text style={styles.exploreButtonText}>View more</Text></TouchableOpacity>
        </View>
        <FlatList data={watchEvents} horizontal keyExtractor={(item) => item.id} showsHorizontalScrollIndicator={false} style={styles.horizontalList} contentContainerStyle={{ paddingHorizontal: 20 }} renderItem={({ item }) => (
            <TouchableOpacity style={styles.watchCard}>
                <Image source={item.image} style={styles.watchImage} />
                <View style={styles.watchCardTop}>
                    <BlurView intensity={70} tint="dark" style={styles.dateTag}>
                        <Image source={calendarIcon} style={styles.dateTagIcon} />
                        <Text style={styles.dateTagText}>{item.time}</Text>
                    </BlurView>
                </View>
                <View style={styles.watchTagsContainer}>
                    <Text style={styles.offerTag}>{item.offer}</Text>
                    <BlurView intensity={70} tint="dark" style={styles.moreTagBlur}>
                        <Text style={styles.moreTag}>{item.more}</Text>
                    </BlurView>
                </View>
                <View style={styles.cardBottomWrapperFull}>
                    <Image source={item.image} style={styles.blurredBgImage} blurRadius={20} />
                    <LinearGradient colors={['rgba(3,3,3,0.7)', 'rgba(75,75,75,0.8)', '#2B2B2B']} style={styles.watchOverlay} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                        <View>
                            <View style={styles.heatmeterContainer}>
                                <Text>🔥</Text>
                                <View style={styles.heatmeterBar}>
                                    <LinearGradient colors={['#F9507A', '#4A71F3']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={[styles.heatmeterFill, {width: `${item.heat}%`}]} />
                                </View>
                            </View>
                            <View style={styles.watchTitleRow}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.watchTitle}>{item.title}</Text>
                                    <Text style={styles.watchVenue}>{item.venue}</Text>
                                </View>
                                <Image source={arrowIcon2} style={styles.watchArrowIcon} />
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        )} />

        <View style={styles.section}>
            <View style={styles.bannerContainer}>
                <Image source={bestintownImage} style={styles.banner} />
            </View>
            <View style={styles.tabRow}>
                <TouchableOpacity style={styles.tabActive}><Text style={styles.tabTextActive}>This Week</Text></TouchableOpacity>
                <TouchableOpacity style={styles.tabInactive}><Text style={styles.tabTextInactive}>Up Next</Text></TouchableOpacity>
                <TouchableOpacity style={styles.tabInactive}><Text style={styles.tabTextInactive}>Specials</Text></TouchableOpacity>
            </View>
            {thisWeekEvents.map((event) => (<TouchableOpacity key={event.id} style={styles.eventCard}>
                <Image source={event.image} style={styles.eventImg} />
                <View style={styles.eventContent}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDetails}>{event.festival}</Text>
                    <Text style={styles.eventLocationTime}>{event.location} • {event.time}</Text>
                    <View style={styles.eventTagsRow}>
                        {event.tags.map((tag, index) => (
                            <View key={index} style={styles.eventTag}>
                                <Image source={freeshotsIcon} style={styles.eventTagIcon} />
                                <Text style={styles.eventTagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </TouchableOpacity>))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

// --- (Styles remain the same) ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#161622' },
    backgroundGradient: { position: 'absolute', top: 0, left: 0, right: 0, height: height },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#161622' },
    header: { paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingHorizontal: 20, paddingBottom: 20 },
    headerTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    logo: { width: 100, height: 40, resizeMode: 'contain' },
    rewardButton: { shadowColor: '#FF9800', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 15 },
    rewardIcon: { width: 60, height: 60, resizeMode: 'contain' },
    searchBarWrapper: { borderRadius: 25, overflow: 'hidden' },
    searchBarContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, height: 50 },
    searchIcon: { width: 18, height: 18, tintColor: '#999', marginRight: 12 },
    searchBar: { flex: 1, color: '#fff', fontFamily: 'Inter_400Regular', fontSize: 16 },
    slider: { height: cardHeight + 60, marginTop: 10 },
    carouselContainer: { paddingHorizontal: carouselPadding, alignItems: 'center', paddingVertical: 20 },
    animatedCardWrapper: { width: cardWidth, height: cardHeight, marginRight: cardSpacing, justifyContent: 'center', alignItems: 'center' },
    featureCard: { width: '100%', height: '100%', borderRadius: 24, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 10, backgroundColor: '#222' },
    featureImage: { width: '100%', height: '100%', position: 'absolute' },
    freebiesTag: { position: 'absolute', top: 15, left: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, overflow: 'hidden' },
    freebiesText: { color: '#fff', fontSize: 12, fontFamily: 'Inter_700Bold', marginLeft: 5 },
    freebiesIcon: { width: 14, height: 14, marginRight: 3 },
    countTag: { position: 'absolute', top: 15, right: 15, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, overflow: 'hidden' },
    countText: { color: '#fff', fontSize: 12, fontFamily: 'Inter_700Bold' },
    dateBanner: { position: 'absolute', right: -1, top: '35%', backgroundColor: 'rgba(0,0,0,0.6)', paddingVertical: 8, paddingHorizontal: 4, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, alignItems: 'center' },
    dateBannerDay: { color: '#fff', fontFamily: 'Inter_700Bold', fontSize: 14 },
    dateBannerDate: { color: '#fff', fontFamily: 'Inter_400Regular', fontSize: 10, letterSpacing: 1 },
    cardBottomWrapperFeature: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', overflow: 'hidden' },
    featureCardBottom: { flex: 1, paddingHorizontal: 20, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'},
    tag: { color: '#fff', fontSize: 12, alignSelf: 'flex-start', fontFamily: 'Inter_700Bold', marginBottom: 3, textTransform: 'uppercase' },
    title: { fontSize: 20, color: '#fff', fontFamily: 'Chivo_700Bold', lineHeight: 24 },
    sub: { color: '#ccc', fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: 2 },
    arrowIconContainer: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
    arrowIcon: { width: 20, height: 20, tintColor: '#fff', resizeMode: 'contain' },
    tagIcon: { width: 14, height: 14, marginRight: 5 },
    section: { marginTop: 30, paddingHorizontal: 20 },
    sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, paddingHorizontal: 20, marginBottom: 20 },
    sectionTitle: { color: '#fff', fontSize: 20, fontFamily: 'Chivo_700Bold' },
    exploreButtonText: { color: '#aaa', fontSize: 14, fontFamily: 'Inter_400Regular' },
    horizontalList: { flexGrow: 0, overflow: 'visible' },
    clubCard: { marginRight: 15, width: 180, height: 220, borderRadius: 16, overflow: 'hidden', justifyContent: 'space-between' },
    clubImage: { width: '100%', height: '100%', position: 'absolute' },
    clubTag: { flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 10, left: 10, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, overflow: 'hidden' },
    clubTagText: { color: '#fff', fontSize: 11, fontFamily: 'Inter_700Bold' },
    cardBottomWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', overflow: 'hidden' },
    cardBottomWrapperFull: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', overflow: 'hidden' },
    clubCardContent: { flex: 1, padding: 12, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
    clubNameRow: { flexDirection: 'row', alignItems: 'center' },
    clubName: { color: '#fff', fontFamily: 'Chivo_700Bold', fontSize: 18, marginRight: 5 },
    clubCost: { color: '#4CAF50', fontFamily: 'Inter_700Bold', fontSize: 14 },
    clubLocation: { color: '#aaa', fontFamily: 'Inter_400Regular', fontSize: 12 },
    clubArrow: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center' },
    clubArrowIcon: { width: 16, height: 16, resizeMode: 'contain' },
    watchCard: { marginRight: 15, width: 240, height: 240, borderRadius: 16, overflow: 'hidden', justifyContent: 'space-between' },
    watchImage: { width: '100%', height: '100%', position: 'absolute' },
    blurredBgImage: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%' },
    watchCardTop: { padding: 10, alignItems: 'flex-start' },
    dateTag: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, overflow: 'hidden' },
    dateTagIcon: { width: 14, height: 14, tintColor: '#fff', marginRight: 6 },
    dateTagText: { color: '#fff', fontFamily: 'Inter_700Bold', fontSize: 12 },
    watchOverlay: { flex: 1, padding: 15, justifyContent: 'flex-end' },
    watchTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
    watchTitle: { color: '#fff', fontFamily: 'Chivo_700Bold', fontSize: 16, flexShrink: 1, marginRight: 5 },
    watchVenue: { color: '#ccc', fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4 },
    watchArrowIcon: { width: 30, height: 30, resizeMode: 'contain' },
    watchTagsContainer: { position: 'absolute', bottom: '52%', left: 15, right: 15, flexDirection: 'row', alignItems: 'center' },
    offerTag: { backgroundColor: '#4A71F3', color: '#fff', fontFamily: 'Inter_700Bold', fontSize: 11, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 8 },
    moreTagBlur: { borderRadius: 12, overflow: 'hidden' },
    moreTag: { color: '#ccc', fontFamily: 'Inter_400Regular', fontSize: 11, paddingHorizontal: 10, paddingVertical: 4 },
    heatmeterContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    heatmeterBar: { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, marginLeft: 8, overflow: 'hidden' },
    heatmeterFill: { height: '100%', borderRadius: 3 },
    bannerContainer: { borderRadius: 12, overflow: 'hidden', height: 150 },
    banner: { width: '100%', height: '100%', resizeMode: 'cover' },
    tabRow: { flexDirection: 'row', marginVertical: 25 },
    tabActive: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, marginRight: 10 },
    tabTextActive: { color: '#000', fontFamily: 'Inter_700Bold' },
    tabInactive: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, marginRight: 10 },
    tabTextInactive: { color: '#fff', fontFamily: 'Inter_700Bold' },
    eventCard: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    eventImg: { width: 100, height: 130, borderRadius: 10, marginRight: 12, resizeMode: 'cover' },
    eventContent: { flex: 1, alignSelf: 'flex-start' },
    eventTitle: { color: '#fff', fontFamily: 'Chivo_700Bold', fontSize: 16 },
    eventDetails: { color: '#ccc', fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4 },
    eventLocationTime: { color: '#aaa', fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4 },
    eventTagsRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
    eventTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(187, 134, 252, 0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginRight: 8, marginBottom: 8 },
    eventTagIcon: { width: 12, height: 12, marginRight: 4 },
    eventTagText: { color: '#BB86FC', fontSize: 10, fontFamily: 'Inter_700Bold' },
    dateText: { color: '#aaa', fontSize: 12, fontFamily: 'Inter_400Regular' },
});
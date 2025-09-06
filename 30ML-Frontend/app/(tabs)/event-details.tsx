import { Chivo_700Bold } from '@expo-google-fonts/chivo';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useScroll } from './_layout';

const femaleIcon = require('../../assets/images/female.png');
const maleIcon = require('../../assets/images/male.png');
const venueIcon = require('../../assets/images/book_icon.png');
const eventBanner = require('../../assets/images/event1.png');
const shareIcon = require('../../assets/images/share.png');

export default function EventDetailsPage() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Chivo_700Bold,
  });
  const [showFullText, setShowFullText] = useState(false);
  const { setScrollDirection } = useScroll();
  const lastOffsetY = useRef(0);

  if (!fontsLoaded) {
    return null;
  }

  const aboutText = `About this events : #KittyKo is back! A place where it's all about Music Fashion and Champagne 😎`;

  const handleScroll = (event) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const direction = currentOffsetY > lastOffsetY.current ? 'down' : 'up';
    if (currentOffsetY > 0) {
      setScrollDirection(direction);
    } else {
      setScrollDirection('up');
    }
    lastOffsetY.current = currentOffsetY;
  };


  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <ImageBackground source={eventBanner} style={styles.headerImage}>
          <View style={styles.headerOverlay}>
            <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
              <Text style={styles.headerButtonBack}>‹</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Image source={shareIcon} style={styles.shareIcon} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.eventTitle}>DJ Rebeka & Pun33t</Text>
            <View style={styles.headerRow}>
              <Text style={styles.eventSubtitle}>Ladies Night</Text>
              <View style={styles.liveTag}>
                <Text style={styles.liveText}>• LIVE</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>29th</Text>
              <Text style={styles.detailSubtitle}>December</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Tuesday</Text>
              <Text style={styles.detailSubtitle}>10:00 PM - End</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Kitty ko</Text>
              <Text style={styles.detailSubtitle}>Yelahanka</Text>
            </View>
          </View>

          <View style={styles.genderRatioContainer}>
            <Image source={femaleIcon} style={styles.genderIcon} />
            <View style={styles.genderBar}>
              <View style={[styles.genderBarFill, { width: '70%' }]} />
            </View>
            <Image source={maleIcon} style={styles.genderIcon} />
          </View>

          <View style={styles.aboutContainer}>
            <Text style={styles.aboutText}>
              {aboutText}
              <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
                <Text style={styles.readMoreText}> Read more</Text>
              </TouchableOpacity>
            </Text>
          </View>

          <View style={styles.offerCard}>
            <View style={styles.offerTextContainer}>
              <Text style={styles.offerTitle}>FREE shots for ladies</Text>
              <Text style={styles.offerSubtitle}>Applicable till 9 PM</Text>
            </View>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>1/5</Text>
              <View style={styles.dotsContainer}>
                {[...Array(5)].map((_, i) => (
                  <View key={i} style={[styles.dot, i < 1 && styles.activeDot]} />
                ))}
              </View>
            </View>
          </View>

          <TouchableOpacity>
            <LinearGradient
              colors={['#7E42F5', '#4A23A0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.passCard}
            >
              <View style={styles.passContent}>
                <Text style={styles.passTitle}>Get 30ML Pass</Text>
                <Text style={styles.passSubtitle}>Redeemable anywhere, any day, anytime</Text>
                <Text style={styles.passDiscountText}>Unlocks unlimited discounts</Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Venue</Text>
            <View style={styles.venueContainer}>
              <Text style={styles.venueIcon}>📍</Text>
              <View style={styles.venueTextContainer}>
                <Text style={styles.venueName}>Kitty Ko</Text>
                <Text style={styles.venueAddress}>3V98+PQC, ramadevera Betta road, Iruligara colony, Bengaluru, Karnataka 560045, India</Text>
                <TouchableOpacity>
                  <Text style={styles.getDirections}>Get Directions ›</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.alreadyHereCard}>
            <Text style={styles.sectionTitle}>Already here?</Text>
            <Text style={styles.alreadyHereText}>Unlock amazing offers and explore the menu! Simply scan the 30ml QR code at the venue to check in.</Text>
            <TouchableOpacity>
              <Text style={styles.selfCheckin}>Self Check-in ›</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Support</Text>
              <TouchableOpacity style={styles.supportRow}>
                  <Text style={styles.supportText}>Terms & Conditions</Text>
                  <Text style={styles.arrowIcon}>›</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.supportRow}>
                  <Text style={styles.supportText}>Contact Us</Text>
                  <Text style={styles.arrowIcon}>›</Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomIconContainer}>
          <Image source={venueIcon} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton} onPress={() => router.push('/(tabs)/BookingScreen')}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070717',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  headerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  headerOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonBack: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  shareIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  content: {
    padding: 16,
    backgroundColor: '#070717',
  },
  header: {
    marginBottom: 20,
  },
  eventTitle: {
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    fontSize: 26,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  eventSubtitle: {
    fontFamily: 'Inter_400Regular',
    color: '#A0A0A0',
    fontSize: 16,
  },
  liveTag: {
    backgroundColor: '#E53935',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  liveText: {
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    fontSize: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  detailBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2A2A3A',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  detailTitle: {
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    fontSize: 14,
  },
  detailSubtitle: {
    fontFamily: 'Inter_400Regular',
    color: '#A0A0A0',
    fontSize: 11,
    marginTop: 4,
  },
  genderRatioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  genderIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  genderBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#3FA9F5',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  genderBarFill: {
    height: '100%',
    backgroundColor: '#FF4081',
    borderRadius: 4,
  },
  aboutContainer: {
    marginBottom: 20,
  },
  aboutText: {
    fontFamily: 'Inter_400Regular',
    color: '#A0A0A0',
    fontSize: 14,
    lineHeight: 20,
  },
  readMoreText: {
    color: '#FF4081',
    fontFamily: 'Inter_700Bold',
  },
  offerCard: {
    backgroundColor: '#1A1A2A',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  offerTextContainer: {
    flex: 1,
  },
  offerTitle: {
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    fontSize: 14,
  },
  offerSubtitle: {
    fontFamily: 'Inter_400Regular',
    color: '#A0A0A0',
    fontSize: 12,
    marginTop: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontFamily: 'Inter_400Regular',
    color: '#FFFFFF',
    fontSize: 12,
    marginRight: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#333343',
  },
  activeDot: {
    backgroundColor: '#FF4081',
  },
  passCard: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 24,
  },
  passContent: {
    flex: 1,
  },
  passTitle: {
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    fontSize: 16,
  },
  passSubtitle: {
    fontFamily: 'Inter_400Regular',
    color: '#E0E0E0',
    fontSize: 12,
    marginTop: 4,
  },
  passDiscountText: {
    fontFamily: 'Inter_400Regular',
    color: '#C0C0C0',
    fontSize: 11,
    marginTop: 2,
  },
  arrowIcon: {
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    fontSize: 24,
    marginLeft: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 12,
  },
  venueContainer: {
    flexDirection: 'row',
  },
  venueIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  venueTextContainer: {
    flex: 1,
  },
  venueName: {
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    fontSize: 14,
  },
  venueAddress: {
    fontFamily: 'Inter_400Regular',
    color: '#A0A0A0',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  getDirections: {
    fontFamily: 'Inter_700Bold',
    color: '#FF4081',
    fontSize: 13,
    marginTop: 8,
  },
  alreadyHereCard: {
    backgroundColor: '#1A1A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  alreadyHereText: {
    fontFamily: 'Inter_400Regular',
    color: '#A0A0A0',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  selfCheckin: {
    fontFamily: 'Inter_700Bold',
    color: '#FF4081',
    fontSize: 13,
  },
  supportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A3A',
  },
  supportText: {
    fontFamily: 'Inter_400Regular',
    color: '#FFFFFF',
    fontSize: 14,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 30,
    backgroundColor: '#070717',
    borderTopWidth: 1,
    borderTopColor: '#2A2A3A',
  },
  bottomIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#1A1A2A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bottomIcon: {
    width: 24,
    height: 24,
    tintColor: '#FF4081',
  },
  bookButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#7E42F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    fontSize: 16,
  },
});
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../shared/store';
import { Button, Text as DSText, Card } from '@divyaasirwad/design-system';

const { width } = Dimensions.get('window');

const slides = [
  { id: '1', title: 'Book Pujas Online', subtitle: 'Connect with temples and pandits across India.', icon: '🛕', color: '#FFE0B2' },
  { id: '2', title: 'Live Darshan & Updates', subtitle: 'Watch live darshan, receive photos of your completed puja.', icon: '📿', color: '#E8F5E9' },
  { id: '3', title: 'Prasad at Your Doorstep', subtitle: 'Get blessed prasad delivered with live tracking.', icon: '🪔', color: '#FFF3E0' },
];

export function OnboardingScreen() {
  const navigation = useNavigation<any>();
  const { setOnboarded } = useAuthStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setOnboarded();
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <DSText variant="heading" weight="extrabold" style={styles.title}>{item.title}</DSText>
            <DSText variant="body" color="#6B7280" style={styles.subtitle}>{item.subtitle}</DSText>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentIndex && styles.activeDot]} />
          ))}
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => { setOnboarded(); navigation.replace('Login'); }}>
            <DSText variant="label" weight="semibold" color="#6B7280">Skip</DSText>
          </TouchableOpacity>
          <Button title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'} onPress={handleNext} size="md" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  slide: { width, flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  iconWrapper: { width: 160, height: 160, borderRadius: 80, alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  icon: { fontSize: 72 },
  title: { textAlign: 'center', marginBottom: 12 },
  subtitle: { textAlign: 'center', lineHeight: 24 },
  footer: { paddingHorizontal: 24, paddingBottom: 60, paddingTop: 20 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E5E7EB', marginHorizontal: 4 },
  activeDot: { width: 24, backgroundColor: '#FF6F00' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

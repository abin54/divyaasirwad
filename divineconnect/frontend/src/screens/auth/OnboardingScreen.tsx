import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fontSize, spacing, borderRadius } from '../../constants/theme';
import { useAuthStore } from '../../store';
import Button from '../../components/common/Button';

const { width, height } = Dimensions.get('window');

const slides = [
  { id: '1', title: 'Book Pujas Online', titleHi: 'ऑनलाइन पूजा बुक करें', subtitle: 'Connect with temples and pandits across India. Book verified pujas from the comfort of your home.', icon: '🛕', color: '#FFE0B2' },
  { id: '2', title: 'Live Darshan & Updates', titleHi: 'लाइव दर्शन और अपडेट', subtitle: 'Watch live darshan, receive photos and videos of your completed puja with real-time updates.', icon: '📿', color: '#E8F5E9' },
  { id: '3', title: 'Prasad at Your Doorstep', titleHi: 'प्रसाद आपके दरवाजे पर', subtitle: 'Get blessed prasad delivered to your home with live tracking. Stay connected to divinity.', icon: '🪔', color: '#FFF3E0' },
];

export default function OnboardingScreen() {
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
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
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
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <Button title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'} onPress={handleNext} size="md" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.goldLight },
  slide: { width, flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xxxl },
  iconWrapper: { width: 160, height: 160, borderRadius: 80, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xxxl },
  icon: { fontSize: 72 },
  title: { fontSize: fontSize.title, fontWeight: '800', color: colors.text, textAlign: 'center', marginBottom: spacing.md },
  subtitle: { fontSize: fontSize.md, color: colors.textSecondary, textAlign: 'center', lineHeight: 24 },
  footer: { paddingHorizontal: spacing.xxl, paddingBottom: 60, paddingTop: spacing.xl },
  dots: { flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.xxl },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border, marginHorizontal: 4 },
  activeDot: { width: 24, backgroundColor: colors.primary },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  skipText: { fontSize: fontSize.lg, color: colors.textSecondary, fontWeight: '600' },
});

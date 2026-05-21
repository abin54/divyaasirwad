import mongoose from 'mongoose';
import Deity from '../src/models/Deity';
import Ritual from '../src/models/Ritual';
import Temple from '../src/models/Temple';
import { config } from '../src/config';

const seedDeities = [
  { name: 'Shiva', nameHi: 'शिव', nameBn: 'শিব', slug: 'shiva', description: 'The destroyer and transformer in the Hindu trinity.', descriptionHi: 'हिन्दू त्रिमूर्ति में संहारक और परिवर्तनकारी।', descriptionBn: 'হিন্দু ত্রিমূর্তিতে ধ্বংসকারী ও পরিবর্তনকারী।', image: '', icon: '🕉️', category: 'primary', associatedMantra: 'Om Namah Shivaya', associatedColors: ['#4CAF50', '#E8F5E9'], festivals: ['Maha Shivratri', 'Shravan', 'Kartik Purnima'], order: 1 },
  { name: 'Krishna', nameHi: 'कृष्ण', nameBn: 'কৃষ্ণ', slug: 'krishna', description: 'The divine cowherd and supreme personality of Godhead.', descriptionHi: 'दिव्य गोपाल और भगवान का सर्वोच्च व्यक्तित्व।', descriptionBn: 'দিব্য গোপাল ও ভগবানের সর্বোচ্চ ব্যক্তিত্ব।', image: '', icon: '🪈', category: 'primary', associatedMantra: 'Om Namo Bhagavate Vasudevaya', associatedColors: ['#2196F3', '#E3F2FD'], festivals: ['Janmashtami', 'Holi', 'Gita Jayanti'], order: 2 },
  { name: 'Durga', nameHi: 'दुर्गा', nameBn: 'দুর্গা', slug: 'durga', description: 'The divine mother and destroyer of evil.', descriptionHi: 'दिव्य माता और बुराई की विनाशक।', descriptionBn: 'দিব্য মাতা ও অশুভের বিনাশকারী।', image: '', icon: '🦁', category: 'primary', associatedMantra: 'Om Dum Durgayai Namaha', associatedColors: ['#E91E63', '#FCE4EC'], festivals: ['Navratri', 'Durga Puja', 'Dussehra'], order: 3 },
  { name: 'Hanuman', nameHi: 'हनुमान', nameBn: 'হনুমান', slug: 'hanuman', description: 'The devoted servant of Lord Ram, symbol of strength.', descriptionHi: 'भगवान राम के भक्त, शक्ति के प्रतीक।', descriptionBn: 'ভগবান রামের ভক্ত, শক্তির প্রতীক।', image: '', icon: '🙏', category: 'primary', associatedMantra: 'Om Hanumate Namaha', associatedColors: ['#FF9800', '#FFF3E0'], festivals: ['Hanuman Jayanti', 'Tuesday'], order: 4 },
  { name: 'Lakshmi', nameHi: 'लक्ष्मी', nameBn: 'লক্ষ্মী', slug: 'lakshmi', description: 'The goddess of wealth, fortune, and prosperity.', descriptionHi: 'धन, भाग्य और समृद्धि की देवी।', descriptionBn: 'ধন, ভাগ্য ও সমৃদ্ধির দেবী।', image: '', icon: '🌺', category: 'primary', associatedMantra: 'Om Shreem Mahalakshmiyei Namaha', associatedColors: ['#9C27B0', '#F3E5F5'], festivals: ['Diwali', 'Varalakshmi Vratam'], order: 5 },
  { name: 'Ganesh', nameHi: 'गणेश', nameBn: 'গণেশ', slug: 'ganesh', description: 'The remover of obstacles and lord of beginnings.', descriptionHi: 'विघ्नहर्ता और शुभारंभ के स्वामी।', descriptionBn: 'বিঘ্নহর্তা ও শুভারম্ভের প্রভু।', image: '', icon: '🐘', category: 'primary', associatedMantra: 'Om Gam Ganapataye Namaha', associatedColors: ['#FFB300', '#FFF8E1'], festivals: ['Ganesh Chaturthi', 'Sankashti Chaturthi'], order: 6 },
];

const seedRituals = [
  { name: 'Satyanarayan Puja', nameHi: 'सत्यनारायण पूजा', nameBn: 'সত্যানারায়ণ পূজা', slug: 'satyanarayan-puja', description: 'A sacred ritual to invoke Lord Vishnu for prosperity and peace.', descriptionHi: 'समृद्धि और शांति के लिए भगवान विष्णु का आह्वान।', descriptionBn: 'সমৃদ্ধি ও শান্তির জন্য ভগবান বিষ্ণুর আহ্বান।', shortDescription: 'Vishnu puja for prosperity', category: 'puja', type: 'both', deity: null, pricing: { basic: 1100, standard: 2100, premium: 5100 }, duration: { basic: 60, standard: 120, premium: 180 }, includes: ['Mantra chanting', 'Basic samagri', 'Sankalp'], requirements: ['Clean clothes', 'Fasting recommended'], samagri: ['Fruits', 'Flowers', 'Coconuts', 'Panchamrit'], benefits: ['Prosperity', 'Peace', 'Harmony'], benefitsHi: ['समृद्धि', 'शांति', 'सद्भाव'], benefitsBn: ['সমৃদ্ধি', 'শান্তি', 'সামঞ্জস্য'], isPopular: true, isTrending: true, order: 1 },
  { name: 'Rudrabhishek', nameHi: 'रुद्राभिषेक', nameBn: 'রুদ্রাভিষেক', slug: 'rudrabhishek', description: 'Powerful Shiva ritual for removing obstacles and negative energies.', descriptionHi: 'बाधाओं और नकारात्मक ऊर्जाओं को दूर करने के लिए शक्तिशाली शिव अनुष्ठान।', descriptionBn: 'বাধা ও নেতিবাচক শক্তি দূর করতে শক্তিশালী শিব অনুষ্ঠান।', shortDescription: 'Shiva abhishek for protection', category: 'puja', type: 'temple', deity: null, pricing: { basic: 1500, standard: 3100, premium: 7100 }, duration: { basic: 60, standard: 120, premium: 240 }, includes: ['Rudra mantras', 'Abhishek with 5 items', 'Bilva leaves'], requirements: ['Clean clothes', 'Fasting'], samagri: ['Milk', 'Honey', 'Ghee', 'Gangajal', 'Bilva leaves'], benefits: ['Protection', 'Health', 'Success'], benefitsHi: ['सुरक्षा', 'स्वास्थ्य', 'सफलता'], benefitsBn: ['সুরক্ষা', 'স্বাস্থ্য', 'সাফল্য'], isPopular: true, isTrending: true, order: 2 },
  { name: 'Lakshmi Puja', nameHi: 'लक्ष्मी पूजा', nameBn: 'লক্ষ্মী পূজা', slug: 'lakshmi-puja', description: 'Invoke Goddess Lakshmi for wealth, abundance, and prosperity.', descriptionHi: 'धन, समृद्धि और वैभव के लिए मां लक्ष्मी का आह्वान।', descriptionBn: 'ধন, সমৃদ্ধি ও বৈভবের জন্য মা লক্ষ্মীর আহ্বান।', shortDescription: 'Goddess of wealth puja', category: 'puja', type: 'both', deity: null, pricing: { basic: 1100, standard: 2100, premium: 5100 }, duration: { basic: 45, standard: 90, premium: 150 }, includes: ['Lakshmi mantras', 'Lotus offering', 'Aarti'], requirements: ['Clean clothes', 'Clean home'], samagri: ['Lotus flowers', 'Coins', 'Sweets', 'Incense'], benefits: ['Wealth', 'Abundance', 'Fortune'], benefitsHi: ['धन', 'समृद्धि', 'भाग्य'], benefitsBn: ['ধন', 'সমৃদ্ধি', 'ভাগ্য'], isPopular: true, isTrending: false, order: 3 },
  { name: 'Navgraha Puja', nameHi: 'नवग्रह पूजा', nameBn: 'নবগ্রহ পূজা', slug: 'navgraha-puja', description: 'Appease all nine planets for cosmic balance and removing doshas.', descriptionHi: 'ब्रह्मांडीय संतुलन और दोष निवारण के लिए नौ ग्रहों की शांति।', descriptionBn: 'মহাজাগতিক ভারসাম্য ও দোষ নিবারণের জন্য নয় গ্রহের শান্তি।', shortDescription: 'Nine planets puja', category: 'puja', type: 'temple', deity: null, pricing: { basic: 2100, standard: 5100, premium: 11000 }, duration: { basic: 90, standard: 180, premium: 300 }, includes: ['Navgraha mantras', 'Havan', 'Special offerings'], requirements: ['Kundli recommended'], samagri: ['9 types of grains', '9 colored clothes', 'Navgraha yantra'], benefits: ['Planetary Peace', 'Remedy Doshas', 'Success'], benefitsHi: ['ग्रह शांति', 'दोष निवारण', 'सफलता'], benefitsBn: ['গ্রহ শান্তি', 'দোষ নিবারণ', 'সাফল্য'], isPopular: false, isTrending: true, order: 4 },
  { name: 'Griha Pravesh', nameHi: 'गृह प्रवेश', nameBn: 'গৃহ প্রবেশ', slug: 'griha-pravesh', description: 'Vastu-shanti puja for blessing a new home with positive energy.', descriptionHi: 'सकारात्मक ऊर्जा से नए घर को आशीर्वाद देने के लिए वास्तु शांति।', descriptionBn: 'ইতিবাচক শক্তি দিয়ে নতুন বাড়িকে আশীর্বাদ করতে বাস্তু শান্তি।', shortDescription: 'New home blessing', category: 'sanskar', type: 'home', deity: null, pricing: { basic: 3100, standard: 5100, premium: 11000 }, duration: { basic: 60, standard: 120, premium: 180 }, includes: ['Vastu shanti', 'Ganesh puja', 'Havan'], requirements: ['New home details'], samagri: ['Kalash', 'Coconut', 'Rice', 'Turmeric'], benefits: ['Vastu Peace', 'Prosperity', 'Protection'], benefitsHi: ['वास्तु शांति', 'समृद्धि', 'सुरक्षा'], benefitsBn: ['বাস্তু শান্তি', 'সমৃদ্ধি', 'সুরক্ষা'], isPopular: true, isTrending: false, order: 5 },
];

const seedTemples = [
  { name: 'Kashi Vishwanath Temple', nameHi: 'काशी विश्वनाथ मंदिर', nameBn: 'কাশী বিশ্বনাথ মন্দির', slug: 'kashi-vishwanath', description: 'One of the twelve Jyotirlingas, dedicated to Lord Shiva in Varanasi.', shortDescription: 'Famous Jyotirlinga in Varanasi', mainImage: '', deity: null, deities: [], address: { street: 'Vishwanath Lane', area: 'Godowlia', city: 'Varanasi', state: 'Uttar Pradesh', pincode: '221001', country: 'India' }, location: { type: 'Point', coordinates: [83.0103, 25.3108] }, contact: { phone: '+91 542 2393456', email: '', website: '' }, timings: { morning: { open: '04:00', close: '12:00' }, evening: { open: '16:00', close: '23:00' }, aartiTimings: [{ name: 'Mangala Aarti', time: '04:00' }, { name: 'Sandhya Aarti', time: '19:00' }] }, facilities: ['Parking', 'Lockers', 'Prasad', 'Cloakroom'], category: 'famous', rating: 4.8, reviewCount: 12453, totalBookings: 2450, isVerified: true, pandits: [], pricing: { minPujaPrice: 1100, maxPujaPrice: 11000 }, gallery: [], videos: [], festivals: [{ name: 'Maha Shivratri', date: 'Feb/Mar', description: 'Grand celebration' }], isActive: true, isDeleted: false, createdBy: null },
  { name: 'Banke Bihari Temple', nameHi: 'बांके बिहारी मंदिर', nameBn: 'বাঁকে বিহারী মন্দির', slug: 'banke-bihari', description: 'Sacred Krishna temple in Vrindavan, the land of divine love.', shortDescription: 'Sacred Krishna temple in Vrindavan', mainImage: '', deity: null, deities: [], address: { street: 'Banshi Ghat Road', area: 'Vrindavan', city: 'Mathura', state: 'Uttar Pradesh', pincode: '281121', country: 'India' }, location: { type: 'Point', coordinates: [77.6737, 27.5830] }, contact: { phone: '+91 565 2442211', email: '', website: '' }, timings: { morning: { open: '06:00', close: '12:00' }, evening: { open: '16:00', close: '21:00' }, aartiTimings: [{ name: 'Mangala Aarti', time: '06:00' }, { name: 'Sandhya Aarti', time: '18:00' }] }, facilities: ['Parking', 'Prasad', 'Dharamshala'], category: 'famous', rating: 4.7, reviewCount: 8900, totalBookings: 1890, isVerified: true, pandits: [], pricing: { minPujaPrice: 1100, maxPujaPrice: 7100 }, gallery: [], videos: [], festivals: [{ name: 'Janmashtami', date: 'Aug/Sep', description: 'Grand celebration' }], isActive: true, isDeleted: false, createdBy: null },
  { name: 'Siddhivinayak Temple', nameHi: 'सिद्धिविनायक मंदिर', nameBn: 'সিদ্ধিবিনায়ক মন্দির', slug: 'siddhivinayak', description: 'Mumbai\'s most famous Ganesh temple, visited by millions.', shortDescription: 'Famous Ganesh temple in Mumbai', mainImage: '', deity: null, deities: [], address: { street: 'SK Bole Marg', area: 'Prabhadevi', city: 'Mumbai', state: 'Maharashtra', pincode: '400025', country: 'India' }, location: { type: 'Point', coordinates: [72.8312, 19.0176] }, contact: { phone: '+91 22 24213992', email: '', website: '' }, timings: { morning: { open: '05:30', close: '12:00' }, evening: { open: '16:00', close: '22:00' }, aartiTimings: [{ name: 'Morning Aarti', time: '05:30' }, { name: 'Evening Aarti', time: '19:00' }] }, facilities: ['Parking', 'Lockers', 'Prasad', 'Wheelchair Access'], category: 'famous', rating: 4.8, reviewCount: 15600, totalBookings: 3200, isVerified: true, pandits: [], pricing: { minPujaPrice: 1100, maxPujaPrice: 5100 }, gallery: [], videos: [], festivals: [{ name: 'Ganesh Chaturthi', date: 'Aug/Sep', description: 'Grand celebration' }], isActive: true, isDeleted: false, createdBy: null },
];

const seed = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Deity.deleteMany({});
    await Ritual.deleteMany({});
    await Temple.deleteMany({});

    // Seed deities
    const deities = await Deity.insertMany(seedDeities);
    console.log(`Seeded ${deities.length} deities`);

    // Update rituals with deity references
    const deityMap: Record<string, string> = {};
    deities.forEach((d) => { deityMap[d.slug] = d._id.toString(); });

    const rituals = seedRituals.map((r) => ({ ...r, deity: deityMap[r.deity as string] || deities[0]._id }));
    await Ritual.insertMany(rituals);
    console.log(`Seeded ${rituals.length} rituals`);

    const temples = seedTemples.map((t) => ({ ...t, deity: deityMap['shiva'] || deities[0]._id }));
    await Temple.insertMany(temples);
    console.log(`Seeded ${temples.length} temples`);

    console.log('✅ Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seed();

import Ritual from '../models/Ritual';

interface RecommendationInput {
  purpose?: string;
  deity?: string;
  previousBookings?: string[];
  occasion?: string;
  budget?: number;
}

const PURPOSE_MAP: Record<string, string[]> = {
  health: ['maha-mrityunjaya', 'dhanvantari-puja', 'surya-namaskar'],
  wealth: ['lakshmi-puja', 'kuber-puja', 'ganesh-puja'],
  marriage: ['gauri-puja', 'shiva-puja', 'swayamvara-puja'],
  education: ['saraswati-puja', 'gayatri-jaap'],
  peace: ['shanti-puja', 'navgraha-puja', 'vishnu-puja'],
  success: ['hanuman-chalisa', 'durga-saptashati', 'kali-puja'],
  protection: ['hanuman-chalisa', 'maha-mrityunjaya', 'durga-saptashati'],
  new_home: ['griha-pravesh', 'vastu-shanti', 'ganesh-puja'],
  newborn: ['naamkaran', 'satyanarayan-puja'],
  ancestors: ['pitru-tarpan', 'shraddha-puja'],
};

const OCCASION_MAP: Record<string, string[]> = {
  diwali: ['lakshmi-puja', 'ganesh-puja', 'kuber-puja'],
  navratri: ['durga-saptashati', 'kali-puja', 'navgraha-puja'],
  shivratri: ['rudrabhishek', 'maha-mrityunjaya'],
  janmashtami: ['satyanarayan-puja', 'krishna-puja'],
  ganesh_chaturthi: ['griha-pravesh', 'ganesh-puja'],
  raksha_bandhan: ['satyanarayan-puja', 'lakshmi-puja'],
};

export const getRecommendations = async (input: RecommendationInput) => {
  let slugs: string[] = [];

  if (input.purpose && PURPOSE_MAP[input.purpose]) {
    slugs.push(...PURPOSE_MAP[input.purpose]);
  }

  if (input.occasion && OCCASION_MAP[input.occasion]) {
    slugs.push(...OCCASION_MAP[input.occasion]);
  }

  if (slugs.length === 0) {
    slugs = ['satyanarayan-puja', 'rudrabhishek', 'lakshmi-puja', 'hanuman-chalisa'];
  }

  const rituals = await Ritual.find({ slug: { $in: slugs }, isActive: true })
    .populate('deity', 'name slug icon');

  if (input.budget) {
    return rituals.filter((r) => r.pricing.basic <= input.budget!);
  }

  return rituals;
};

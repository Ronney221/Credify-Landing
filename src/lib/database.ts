import { supabase } from './supabase';

export interface CardDefinition {
  id: string;
  card_id: string;
  name: string;
  image_url: string;
  annual_fee: number;
  statement_credit: number | null;
  rewards_currency: string;
  network: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BenefitDefinition {
  id: string;
  benefit_id: string;
  card_definition_id: string;
  name: string;
  value: number;
  period: 'monthly' | 'semi_annual' | 'annual' | 'quarterly';
  period_months: number;
  reset_type: string;
  description: string;
  redemption_instructions: string;
  app_scheme: string | null;
  categories: string[];
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  terms: string | null;
  redemption_url: string | null;
  image_url: string | null;
  merchant_name: string | null;
  merchant_logo: string | null;
  is_anniversary_benefit: boolean;
  estimated_value: number | null;
  created_at: string;
  updated_at: string;
}

export interface CardWithBenefits extends CardDefinition {
  benefits: BenefitDefinition[];
}

/**
 * Fetch all active cards with their benefits from Supabase
 */
export async function fetchCardsWithBenefits(): Promise<CardWithBenefits[]> {
  try {
    // First, fetch all active cards
    const { data: cards, error: cardsError } = await supabase
      .from('card_definitions')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (cardsError) {
      console.error('Error fetching cards:', cardsError);
      throw cardsError;
    }

    if (!cards || cards.length === 0) {
      return [];
    }

    // Get all card IDs for benefits query
    const cardIds = cards.map(card => card.id);

    // Fetch all benefits for these cards
    const { data: benefits, error: benefitsError } = await supabase
      .from('benefit_definitions')
      .select('*')
      .in('card_definition_id', cardIds)
      .eq('is_active', true)
      .order('name');

    if (benefitsError) {
      console.error('Error fetching benefits:', benefitsError);
      throw benefitsError;
    }

    // Group benefits by card
    const benefitsByCard = (benefits || []).reduce((acc, benefit) => {
      if (!acc[benefit.card_definition_id]) {
        acc[benefit.card_definition_id] = [];
      }
      acc[benefit.card_definition_id].push(benefit);
      return acc;
    }, {} as Record<string, BenefitDefinition[]>);

    // Combine cards with their benefits
    const cardsWithBenefits: CardWithBenefits[] = cards.map(card => ({
      ...card,
      benefits: benefitsByCard[card.id] || []
    }));

    return cardsWithBenefits;
  } catch (error) {
    console.error('Failed to fetch cards with benefits:', error);
    return [];
  }
}

/**
 * Fetch a single card with its benefits
 */
export async function fetchCardWithBenefits(cardId: string): Promise<CardWithBenefits | null> {
  try {
    // Fetch the card
    const { data: card, error: cardError } = await supabase
      .from('card_definitions')
      .select('*')
      .eq('id', cardId)
      .eq('is_active', true)
      .single();

    if (cardError || !card) {
      console.error('Error fetching card:', cardError);
      return null;
    }

    // Fetch benefits for this card
    const { data: benefits, error: benefitsError } = await supabase
      .from('benefit_definitions')
      .select('*')
      .eq('card_definition_id', cardId)
      .eq('is_active', true)
      .order('name');

    if (benefitsError) {
      console.error('Error fetching benefits:', benefitsError);
      return { ...card, benefits: [] };
    }

    return {
      ...card,
      benefits: benefits || []
    };
  } catch (error) {
    console.error('Failed to fetch card with benefits:', error);
    return null;
  }
}

/**
 * Map database card names to local image paths
 */
function getLocalImagePath(cardName: string): string {
  const imageMap: Record<string, string> = {
    'American Express Gold': '/assets/cards/amex_gold.avif',
    'American Express Green': '/assets/cards/amex_green.avif',
    'American Express Platinum': '/assets/cards/amex_plat.avif',
    'Blue Cash Preferred (AmEx)': '/assets/cards/blue_cash_preferred.avif',
    'Bank of America Premium Rewards': '/assets/cards/boa_premium_rewards.png',
    'Bank of America Premium Rewards Elite': '/assets/cards/boa_premium_rewards_elite.png',
    'Chase Sapphire Preferred': '/assets/cards/chase_sapphire_preferred.png',
    'Chase Sapphire Reserve': '/assets/cards/chase_sapphire_reserve.png',
    'Citi Prestige Card': '/assets/cards/citi_prestige.jpeg',
    'Delta SkyMiles Reserve (AmEx)': '/assets/cards/delta_reserve.avif',
    'Hilton Honors Aspire': '/assets/cards/hilton_aspire.avif',
    'Marriott Bonvoy Brilliant': '/assets/cards/marriott_bonvoy_brilliant.avif',
    'U.S. Bank Altitude Reserve Visa Infinite': '/assets/cards/usb_altitude_reserve.png',
    'Capital One Venture X': '/assets/cards/venture_x.avif'
  };

  return imageMap[cardName] || '/assets/cards/amex_plat.avif'; // Fallback to a default card
}

/**
 * Convert database benefit to the format expected by components
 */
export function transformBenefitToCardData(benefit: BenefitDefinition) {
  return {
    name: benefit.name,
    value: benefit.value,
    period: benefit.period,
    description: benefit.description,
    redemption_instructions: benefit.redemption_instructions,
    categories: benefit.categories || []
  };
}

/**
 * Convert database card to the format expected by components
 */
export function transformCardToCardData(card: CardWithBenefits) {
  return {
    name: card.name,
    image: getLocalImagePath(card.name), // Use local images instead of database URLs
    annualFee: card.annual_fee,
    network: card.network,
    rewards_currency: card.rewards_currency,
    benefits: card.benefits.map(transformBenefitToCardData)
  };
}
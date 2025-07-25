import { useState, useEffect } from 'react';
import { fetchCardsWithBenefits, transformCardToCardData, type CardWithBenefits } from '@/lib/database';

export interface CardData {
  name: string;
  image: string;
  annualFee: number;
  network: string;
  rewards_currency: string;
  benefits: {
    name: string;
    value: number;
    period: 'monthly' | 'semi_annual' | 'annual' | 'quarterly';
    description: string;
    redemption_instructions: string;
    categories: string[];
  }[];
}

export function useCardData() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCards() {
      try {
        setLoading(true);
        setError(null);
        
        const rawCards = await fetchCardsWithBenefits();
        const transformedCards = rawCards.map(transformCardToCardData);
        
        setCards(transformedCards);
      } catch (err) {
        console.error('Failed to load card data:', err);
        setError('Failed to load credit card data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadCards();
  }, []);

  return {
    cards,
    loading,
    error,
    refetch: async () => {
      const rawCards = await fetchCardsWithBenefits();
      const transformedCards = rawCards.map(transformCardToCardData);
      setCards(transformedCards);
    }
  };
}
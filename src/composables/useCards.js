import cards from '../data/cards.json'

export default function useCards() {
  const getAll = () => {
    return cards
  }
  const hasCards = () => {
    return !!cards.length
  }
  return {
    getAll,
    hasCards
  }
}

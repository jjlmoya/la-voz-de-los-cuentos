export default function useCards(card) {
  const hasCard = () => {
    return getUserCards().includes(card.order)
  }

  const getUserCards = () => {
    return JSON.parse(localStorage.getItem('cards')) || []
  }

  const unblockCard = index => {
    const _cards = getUserCards()
    localStorage.setItem('cards', JSON.stringify([..._cards, index]))
  }
  return {
    unblockCard,
    hasCard,
    getUserCards
  }
}

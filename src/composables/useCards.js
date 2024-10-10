import cards from '../data/cards.json'

export default function useNewsLetters() {
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

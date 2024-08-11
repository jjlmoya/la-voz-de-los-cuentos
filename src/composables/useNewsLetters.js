import newsletters from '../data/newsletters.json'
export default function useNewsLetters() {
  const getAll = () => {
    return newsletters
  }
  return {
    getAll
  }
}

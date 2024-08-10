import stories from '../data/stories.json'
export default function useSaga(saga) {

    const getTime = () => {
        const accummulatedTime = getStories().reduce((entry, acc) => {
            return acc + parseInt(entry.time)
        }, 0)
        return Math.ceil(accummulatedTime / 60)
    }

    const getStories = () => {
        return stories.filter(_story => _story.saga === saga.key)
    }

    return {
        getStories,
        getTime,
    }
}

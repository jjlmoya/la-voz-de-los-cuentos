import { ref } from 'vue';

export const LinkType = {
    PLAYLIST: 'PLAYLIST',
    VIDEO: 'VIDEO',
};

export default function useYoutubeLink(id, linkType){
    const link = ref('');
    if (linkType.value === LinkType.PLAYLIST || linkType === LinkType.PLAYLIST) {
        link.value = `https://www.youtube.com/playlist?list=${id.value || id}`;
    } else if (linkType.value === LinkType.VIDEO || linkType === LinkType.VIDEO) {
        link.value = `https://www.youtube.com/watch?v=${id.value || id}`;
    }
    return { link };
}
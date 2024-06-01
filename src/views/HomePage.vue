<template>
  <div>
    <Header />
    <HeroBanner />
    <SelectionBanner />
    <FeaturedStories />
    <LatestSagas />
    <MerchandiseTeaser />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import SelectionBanner from '@/components/SelectionBanner.vue';
import HeroBanner from '@/components/HeroBanner.vue';
import FeaturedStories from '@/components/FeaturedStories.vue';
import LatestSagas from '@/components/FeaturedSagas.vue';
import MerchandiseTeaser from '@/components/MerchandiseStore.vue';

export default {
  name: 'HomePage',
  components: {
    Header,
    HeroBanner,
    FeaturedStories,
    LatestSagas,
    MerchandiseTeaser,
    SelectionBanner
  },
};
</script>

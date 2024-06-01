<template>
  <div>
    <Header />
    <HeroBanner />
    <SelectionBannerStories />

    <FeaturedStories />
    <LatestSagas />
    <MerchandiseTeaser />
    <SelectionBannerSagas />
    <MainFooter />

  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import SelectionBannerSagas from '@/components/SelectionBannerSagas.vue';
import SelectionBannerStories from '@/components/SelectionBannerStories.vue';
import HeroBanner from '@/components/HeroBanner.vue';
import FeaturedStories from '@/components/FeaturedStories.vue';
import LatestSagas from '@/components/FeaturedSagas.vue';
import MerchandiseTeaser from '@/components/MerchandiseStore.vue';
import MainFooter from '@/components/MainFooter.vue';

export default {
  name: 'HomePage',
  components: {
    Header,
    HeroBanner,
    FeaturedStories,
    LatestSagas,
    MerchandiseTeaser,
    SelectionBannerSagas,
    SelectionBannerStories,
    MainFooter
  },
};
</script>

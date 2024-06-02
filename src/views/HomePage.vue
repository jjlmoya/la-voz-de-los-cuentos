<template>
  <div>
    <MainLayout>
      <HeroBanner />
      <SelectionBannerStories />
      <FeaturedStories />
      <LatestSagas />
      <MerchandiseTeaser />
      <SelectionBannerSagas />
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from '@/layout/MainLayout.vue';
import SelectionBannerSagas from '@/components/SelectionBannerSagas.vue';
import SelectionBannerStories from '@/components/SelectionBannerStories.vue';
import HeroBanner from '@/components/HeroBanner.vue';
import FeaturedStories from '@/components/FeaturedStories.vue';
import LatestSagas from '@/components/FeaturedSagas.vue';
import MerchandiseTeaser from '@/components/MerchandiseStore.vue';

export default {
  name: 'HomePage',
  components: {
    HeroBanner,
    FeaturedStories,
    LatestSagas,
    MerchandiseTeaser,
    SelectionBannerSagas,
    SelectionBannerStories,
    MainLayout,
  },
};
</script>

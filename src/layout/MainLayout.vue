<template>
  <div>
    <Header />
    <slot></slot>
    <MainFooter />

  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import MainFooter from '@/components/MainFooter.vue';

export default {
  name: 'MainLayout',
  components: {
    Header,
    MainFooter
  },
};
</script>

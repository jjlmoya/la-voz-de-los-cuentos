<template>
  <div class="side-menu">
    <router-link to="/" class="menu-item" :class="{ 'active': $route.path === '/' }">Home</router-link>
    <router-link to="/stories" class="menu-item" :class="{ 'active': $route.path === '/stories' }">Stories</router-link>
    <div class="menu-heading">Sagas</div>
    <router-link v-for="(saga, key) in sagas" :key="key" :to="`/sagas/${key}`" class="sub-menu-item" :class="{ 'active': $route.params.key === key }">{{ saga }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  data() {
    return {
      sagas: {}
    };
  },
  mounted() {
    import('../assets/sagas.json').then(sagas => {
      this.sagas = sagas.default;
    }).catch(error => {
      console.error('Error loading sagas:', error);
    });
  }
};
</script>

<style scoped lang="css">
.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100%;
  background-color: var(--menu-bg-color);
  padding: 16px 8px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.menu-item, .sub-menu-item {
  margin: 8px 0;
  display: block;
  text-decoration: none;
  color: var(--menu-item-color);
  padding: 8px 16px;
  font-size: 14px;
  transition: background-color 0.3s;
  border-radius: 5px;

}

.menu-item:hover,
.menu-item:focus,
.sub-menu-item:hover,
.sub-menu-item:focus {
  background-color: var(--primary-color);
  color: #fff;
  font-weight: bold;
}

.menu-heading {
  color: var(--menu-item-color);
  border: 1px solid black;
}

.sub-menu-item {
  padding: 4px 24px;
  font-size: 12px;
}

.side-menu .router-link-active {
    background-color: var(--secondary-color);
    color: #fff;
    font-weight: bold;
}
</style>

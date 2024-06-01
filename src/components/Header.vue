<template>
  <header class="main-header">
    <nav class="main-header__nav">
      <button class="hamburger-menu" @click="toggleMenu">
        <div class="hamburger-icon">
            <div class="hamburger-icon-1"></div>
            <div class="hamburger-icon-2"></div>
            <div class="hamburger-icon-3"></div>
        </div>
      </button>
      <ul :class="['main-header__nav-list', { 'main-header__nav-list--open': isMenuOpen }]">
        <li class="main-header__nav-item"><router-link class="main-header__nav-link" to="/" @click="closeMenu">Inicio</router-link></li>
        <li class="main-header__nav-item"><router-link class="main-header__nav-link" to="/cuentos" @click="closeMenu">Cuentos</router-link></li>
        <li class="main-header__nav-item"><router-link class="main-header__nav-link" to="/sagas" @click="closeMenu">Sagas</router-link></li>
        <li class="main-header__nav-item"><router-link class="main-header__nav-link" to="/personalizado" @click="closeMenu">Cuento Personalizado</router-link></li>
        <li class="main-header__nav-item"><router-link class="main-header__nav-link" to="/tienda" @click="closeMenu">Tienda</router-link></li>
      </ul>
      <div :class="['backdrop', { 'backdrop--visible': isMenuOpen }]" @click="closeMenu"></div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.classList.toggle('no-scroll', this.isMenuOpen);
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.classList.remove('no-scroll');
    }
  },
  watch: {
    isMenuOpen(newValue) {
      if (!newValue) {
        document.body.classList.remove('no-scroll');
      }
    }
  }
};
</script>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6); /* Fondo transparente */
  padding: 1rem;
  z-index: 10; /* Para asegurarse de que esté encima del hero banner */
  backdrop-filter: blur(10px); /* Opcional: Añade un desenfoque para mejor legibilidad */
}
.main-header__nav {
    display:grid;
    flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
}
.hamburger-menu {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}
.hamburger-icon {
  width: 16px;
  height: 16px;
  position: relative;
}
.hamburger-icon-1,
.hamburger-icon-2,
.hamburger-icon-3{
  content: '';
  width: 16px;
  height: 2px;
  background-color: var(--secondary-color);
  position: absolute;
  top: 0;
}
.hamburger-icon-1 {
  top: 4px;
}

.hamburger-icon-2 {
  top: 8px;
}

.hamburger-icon-3 {
  top: 12px;
}

.hamburger-icon::before {
  top: -8px;
}
.hamburger-icon::after {
  top: 8px;
}
.main-header__nav-list {
  width: 100vw;
  list-style: none;
  display: flex;
  gap: 2rem;
  justify-content: center; /* Centra los elementos del menú */
}
.main-header__nav-list--open {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  z-index: 9;
  flex-direction: column;
  align-items: center;
  height: 50vh;
}
.main-header__nav-link {
  text-decoration: none;
  color: var(--secondary-color);
  font-weight: 500;
}
.main-header__nav-link:hover {
  color: var(--secondary-color);
  cursor: pointer;
}
.backdrop {
  display: none;
}
.backdrop--visible {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 8;
}
.no-scroll {
  overflow: hidden;
}
@media (max-width: 768px) {
  .hamburger-menu {
    display: block;
  }
  .main-header__nav-list {
    display: none;
  }
  .main-header__nav-list--open {
    display: flex;
  }
}
</style>

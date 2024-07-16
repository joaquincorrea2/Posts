<template>
  <div class="manage">
    <h2>GESTIONAR POSTS sacar</h2>
    <!-- puse aca porque parece que de la app a las rutas hijas de manage se pierden las animaciones -->
    <router-view v-slot="{ Component }">
      <transition
        name="custom-classes"
        enter-active-class="animate__animated animate__fadeIn"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

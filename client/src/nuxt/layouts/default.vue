<template lang="pug">
  article()
    b-navbar(
      toggleable="lg",
      type="dark",
      variant="info"
    )
      b-navbar-toggle(target="nav_collapse")
      b-navbar-brand(href="/") Yomitai
      b-collapse#nav_collapse(is-nav)
        b-navbar-nav
          b-nav-item(:to="{ name: 'series' }") シリーズ

    b-container()
      nuxt()
</template>

<style>
</style>

<template lang="pug">
  b-container
    h1 シリーズ
    b-row
      b-col
        b-media(
          v-for="series in seriesList"
          :key="series.name"
        )
          h5 {{series.name}}
</template>

<script>
export default {
  async fetch ({ store }) {
    await store.dispatch('series/fetch')
  },
  computed: {
    seriesList () {
      return this.$store.getters['getSeriesList']()
    }
  }
}
</script>


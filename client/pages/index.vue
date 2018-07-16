<template lang="pug">
  b-container
    b-row
      b-col
        b-form(
          inline,
          @submit.prevent="onSubmit",
          @reset="onReset",
        )
          legend 検索
          b-form-input.mb-2.mr-sm-2.mb-sm-0(
            v-model="input.keyword"
            type="text",
            required,
          )
          b-form-radio-group.mb-2.mr-sm-2.mb-sm-0(
            v-model="input.field"
            buttons,
            button-variant="outline-primary",
            size="small",
            :options="[ { text: 'タイトル', value: 'title', }, { text: '作者', value: 'author', }, ]"
          )
          b-button(
            type="submit",
            variant="primary",
          ) Search
    b-row()
      b-col
        b-alert(
          variant="danger",
          dismissible,
          :show="error",
        )
          h4.alert-heading Error
          p {{error}}
    b-row(v-if="books.length")
      b-col
        b-media(
          v-for="book in books",
          :key="book.title"
        )
          h5.mt-0 {{book.title}}
          p
            time {{book.publicationDate}}
            br
            span.author(
              v-for="(author, index) in book.author",
              :key="index"
              ) {{author}}
          p
            b-button(
              :href="book.url"
              target="_blank"
            ) Amazonで購入
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      input: {
        field: 'title',
        keyword: '',
      },
    }
  },
  computed: {
    error () {
      return this.$store.getters['books/getError']()
    },
    books () {
      return this.$store.getters['books/getRows']() || []
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('books/search', {
        field: this.input.field,
        keyword: this.input.keyword,
      })
    },
    onReset () {
    }
  }
}
</script>

<style lang="stylus" scoped>
.author {
  &:not(:last-child) {
    &::after {
      padding-right: 4px;
      content ','
    }
  }
}
</style>

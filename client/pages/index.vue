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
            :options="[ { text: 'すべて', value: 'any' }, { text: 'タイトル', value: 'title', }, { text: '作者', value: 'author', }, ]"
          )
          b-form-radio-group.mb-2.mr-sm-2.mb-sm-0(
            v-model="input.period"
            buttons,
            button-variant="outline-primary",
            size="small",
            :options="[ { text: '全期間', value: 'all' }, { text: '今月', value: 'this_month', }, { text: '今年', value: 'this_year' } ]"
          )
          b-form-group.mb-2.mr-sm-2.mb-sm-0
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
          no-body
        )
          b-media-aside(vertical-align="center")
            img(
              v-if="book.images",
              :src="book.images.thumbnail.url",
              :width="book.images.thumbnail.width",
              :height="book.images.thumbnail.height",
            )
            b-img(
              v-else,
              blank,
              blank-color="#ccc"
              width="55",
              height="75"
            )
          b-media-body.ml-3()
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
                variant="primary"
                :href="book.url"
                target="_blank"
              ) Amazonで購入
              b-button(
                variant="light"
                @click.prevent="onClickRegistrarSeries(book)"
              ) シリーズを登録
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      input: {
        field: 'any',
        keyword: '',
        period: 'all',
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
        period: this.input.period,
      })
    },
    onReset () {
    },
    onClickRegistrarSeries(book) {
      this.$store.dispatch('series/registrar', book)
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

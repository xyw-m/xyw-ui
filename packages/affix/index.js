import Vue from 'vue'
import affix from './src/affix.vue'

affix.install = function (vue) {
  Vue.component(affix.name, affix)
}

export default affix

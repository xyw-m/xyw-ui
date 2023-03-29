import tagSelect from './src/tagSelect'
import Vue from 'vue'

tagSelect.install = function(vue){
  Vue.component(tagSelect.name, tagSelect)
}

export default tagSelect
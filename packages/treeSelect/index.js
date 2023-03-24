import Vue from 'vue'
import treeSelect from './src/tree-select.vue'

treeSelect.install = function(vue){
  Vue.component(treeSelect.name, treeSelect)
}

export default treeSelect
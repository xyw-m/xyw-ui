import affix from './affix'
import treeSelect from './treeSelect'
import tagSelect  from './tagSelect'
import staffSelect from './staffSelect'

const components = [
  affix,
  treeSelect,
  tagSelect,
  staffSelect
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  affix,
  treeSelect,
  tagSelect,
  staffSelect
}

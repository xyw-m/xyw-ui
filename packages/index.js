import affix from './affix'
import treeSelect from './treeSelect'

const components = [
  affix,
  treeSelect
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
  treeSelect
}

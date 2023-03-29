<template>
  <div class="tag-select" :id="id">
    <el-select
      v-popover:popover
      :value="echoValue"
      popper-class="select-popper"
      :popper-append-to-body="false"
      :multiple="true"
      :placeholder="placeholder"
      :class="{'arrow-up': panelVisible}"
      :filterable="filterable"
      :filter-method="filterMethods"
      :clearable="clearable"
      @clear="clearSelected"
      @remove-tag="removeTag">
      <el-option
        v-for="(item, index) in selectedOptions"
        :key="index"
        :value="item[config.key]"
        :label="item[config.label]"></el-option>
    </el-select>
    <el-popover
      ref="popover"
      popper-class="tag-popover"
      trigger="click"
      v-model="panelVisible"
      placement="bottom-start"
      :width="panelWidth">
      <div class="tag-options">
        <el-tag
          v-for="(option, index) in filterOptions"
          :key="index"
          class="tag"
          :class="{selected: selectedOptions.findIndex(item => item[config.key] === option[config.key]) > -1}"
          type="info"
          @click="select(option)">
          {{ option[config.label] }}
        </el-tag>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'tagSelect',
  data() {
    return {
      id: 'tag-' + new Date().getTime() + Math.floor(Math.random() * Math.pow(10, 4)), // 生成随机16位数id
      panelVisible: false,
      selectedOptions: [],
      panelWidth: 500,
      filterText: ''
    }
  },
  created() {
    window.addEventListener('resize', this.setPanelWidth, false)
    window.addEventListener('click', this.handleClickOutside, true)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setPanelWidth)
    window.removeEventListener('click', this.handleClickOutside)
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    width: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择发动机马力'
    },
    config: {
      type: Object,
      default: function() {
        return {
          label: 'PARAM_CODE',
          key: 'PARAM_ID'
        }
      }
    },
    filterable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    panelVisible(val) {
      if (val) {
        this.setPanelWidth()
      }
    },
    value(newVal) {
      if (Array.isArray(newVal) && !this.isEqual(newVal, this.selectedOptions)) {
        this.selectedOptions = newVal
      }
    }
  },
  computed: {
    echoValue() {
      return this.selectedOptions.map(item => item[this.config.key])
    },
    filterOptions() {
      if (this.filterText == '') return this.options
      return this.options.filter(option => option[this.config.label].indexOf(this.filterText) !== -1)
    }
  },
  methods: {
    removeTag(tag) {
      const index = this.selectedOptions.findIndex(item => item[this.config.key] === tag[this.config.key])
      this.selectedOptions.splice(index, 1)
      this.$emit('change', this.selectedOptions)
    },
    select(option) {
      // 确定是添加还是移除
      const index = this.selectedOptions.findIndex(item => item[this.config.key] === option[this.config.key])
      if (index > -1) {
        // 移除
        this.selectedOptions.splice(index, 1)
      } else {
        this.selectedOptions.push(option)
      }
      this.$emit('change', this.selectedOptions)
      this.$emit('item-click', option)
      this.filterText = ''
    },
    isEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) return false

      const arr1Keys = arr1.map(item => item[this.config.key])
      const arr2Keys = arr2.map(item => item[this.config.key])
      return arr1Keys.every(key => arr2Keys.includes(key))
    },
    setPanelWidth() {
      // 设置面板宽度，用户设定的width > 选择器width
      const select = document.querySelector(`#${this.id}`)
      const selectWidth = select ? getComputedStyle(select).width : '500px'
      this.panelWidth = this.width || selectWidth.replace('px', '')
    },
    filterMethods(val) {
      this.filterText = val
      this.panelVisible = true
    },
    clearSelected() {
      this.selectedOptions = []
      this.$emit('change', this.selectedOptions)
    },
    handleClickOutside(event) {
      const target = event.target
      const panel = document.querySelector('.tag-popover')
      const select = document.querySelector(`#${this.id}`)

      if (!panel || !select) return

      const panelContain = panel.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_CONTAINED_BY
      const selectContain = select.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_CONTAINED_BY
      if (panelContain === 16 || selectContain === 16) {
        // setTimeout(() => {
        //   this.panelVisible = true
        // })
      } else {
        this.panelVisible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-select {
  ::v-deep.select-popper {
    display: none !important
  }

  ::v-deep .arrow-up .el-input__icon {
    transform: rotateZ(0deg)
  }
}
</style>

<style lang="scss">
.tag-options {
  .tag {
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 2px 10px;
    height: auto;
    cursor: pointer;
    &:hover {
      background-color: #6da6ad;
      border-color: #6da6ad;
      color: #ffffff;
    }
  }
  .tag.selected {
  background-color: #6da6ad;
  border-color: #6da6ad;
  color: #ffffff;
}
}
body .tag-popover {
  padding-right: 4px;
  padding-bottom: 4px;
}
</style>

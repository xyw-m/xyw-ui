<template>
  <div class="org-tree-warpper">
    <div class="filter">
      <el-input
        placeholder="请输入关键字"
        v-model="filterText"
        suffix-icon="el-icon-search"
        size="small"
        clearable></el-input>
    </div>
    <el-scrollbar
      tag="div"
      wrapClass="tree-wrap"
      viewClass="tree-view">
      <el-tree
        ref="tree"
        class="org-tree"
        :data="data"
        :props="treeConfig"
        :node-key="treeConfig['node-key']"
        :highlight-current="true"
        :filter-node-method="filterNode"
        :default-expanded-keys="defaultExpandedKeys"
        @node-click="nodeClick"></el-tree>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'orgTree',
  props: {
    treeConfig: Object,
    data: Array
  },
  data() {
    return {
      filterText: ''
    }
  },
  computed: {
    defaultExpandedKeys() {
      if (this.data.length === 0) return []
      const key = this.treeConfig['node-key']
      return [this.data[0][key]]
    }
  },
  watch: {
    filterText(value) {
      this.$refs.tree.filter(value)
    }
  },
  methods: {
    nodeClick(data) {
      this.$emit('click', data)
    },
    filterNode(value, data) {
      if (!value) return true
      const label = this.treeConfig.label
      return data[label].indexOf(value) !== -1
    }
  }

}
</script>

<style lang="scss" scoped>
.org-tree-warpper {
  .filter {
    padding: 0 16px;
    margin-bottom: 14px;
    ::v-deep .el-input__inner:focus{
      border-color: #0088FF;
      &~.el-input__suffix .el-input__suffix-inner {
        color: #0088FF;
      }
    }
  }
  .org-tree {
    ::v-deep .el-tree-node {
      &.is-current>.el-tree-node__content{
        background-color: #FFFFFF;
        .el-tree-node__label {
          color: #FFFFFF !important;
          background-color: #0088FF !important;
          padding: 3px 8px 5px 8px;
        }
      }
      .el-tree-node__content {
        font-size: 12px;
        white-space: normal;
        height: auto !important;
        align-items: flex-start;
        // margin-bottom: 12px;
        .el-tree-node__expand-icon {
          // padding: 3px 6px;
          &:not(.is-leaf){
            color: #999999;
          }
          &.expanded {
            color: #0A7CFF;
          }
        }
        .label-methods-content:hover .tree-mathods {
          background-color: #FFFFFF;
          display: none;
        }
        .label-methods-content:hover .el-tree-node__label {
          background-color: #FFFFFF;
          color: #0088FF
        }
        .el-tree-node__label {
          font-size: 12px;
          line-height: 20px;
          color: #222222;
          padding: 3px 0 5px 0;
          border-radius: 2px;
        }
      }
    }
  }

}
</style>

<style lang="scss">
.org-tree-warpper {
  .tree-wrap {
    height: 370px;
    padding: 0 16px;
  }
  .tree-view {
    padding-right: 10px;
  }
  /* 滚动条样式修改 */
  .el-scrollbar__bar.is-vertical {
    margin-right: 6px;
    .el-scrollbar__thumb {
      background-color: #999999;
    }
  }
}
</style>

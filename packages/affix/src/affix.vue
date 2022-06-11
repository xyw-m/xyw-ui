<template>
  <div ref="placeholderNode" :style="placeholderStyle" class="">
    <div ref="fixedNode" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import {
  getTargetRect,
  getFixedTop,
  getFixedBottom,
  addObserveTarget,
  removeObserveTarget
} from './utils'
export default {
  name: 'XAffix',
  data () {
    return {
      affixStyle: {},
      placeholderStyle: {},
      lastAffix: false,
      prevTarget: null,
      timeout: undefined,
      status: ''
    }
  },
  props: {
    target: {
      type: Function,
      default () {
        return typeof window !== 'undefined' ? window : null
      }
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: Number
  },
  computed: {
    getOffsetTop () {
      const { offsetBottom } = this
      let { offsetTop } = this
      if (offsetBottom === undefined && offsetTop === undefined) {
        offsetTop = 0
      }
      return offsetTop
    },
    getOffsetBottom () {
      return this.offsetBottom
    }
  },
  watch: {
    target (newVal) {
      let newTarget = null
      if (newVal) {
        newTarget = newTarget() || null
      }
      if (this.prevTarget !== newTarget) {
        removeObserveTarget(this)
        if (newTarget) {
          addObserveTarget(newTarget, this)
          this.updatePosition()
        }
        this.prevTarget = newTarget
      }
    },
    offsetTop () {
      this.updatePosition()
    },
    offsetBottom () {
      this.updatePosition()
    }
  },
  methods: {
    prepareMeasure () {
      this.affixStyle = undefined
      this.placeholderStyle = undefined
      this.measure()
    },
    measure () {
      const { lastAffix, target } = this
      if (!this.$refs.fixedNode || !this.$refs.placeholderNode || !target) {
        return
      }
      const offsetTop = this.getOffsetTop
      const offsetBottom = this.getOffsetBottom
      const targetNode = target()

      if (!targetNode) {
        return
      }

      const targetRect = getTargetRect(targetNode)
      const placeholderRect = getTargetRect(this.$refs.placeholderNode)
      const fixedTop = getFixedTop(placeholderRect, targetRect, offsetTop)
      const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom)

      if (fixedTop !== undefined) {
        this.status = 'affix'
        this.affixStyle = {
          position: 'fixed',
          top: fixedTop,
          width: placeholderRect.width + 'px',
          height: placeholderRect.height + 'px'
        }
        this.placeholderStyle = {
          width: placeholderRect.width + 'px',
          height: placeholderRect.height + 'px'
        }
      } else if (fixedBottom !== undefined) {
        this.status = 'affix'
        this.affixStyle = {
          position: 'fixed',
          bottom: fixedBottom,
          width: placeholderRect.width + 'px',
          height: placeholderRect.height + 'px'
        }
        this.placeholderStyle = {
          width: placeholderRect.width + 'px',
          height: placeholderRect.height + 'px'
        }
      }
      this.lastAffix = !!this.affixStyle
      if (lastAffix !== this.lastAffix) {
        this.$emit('change', this.lastAffix)
      }
    },
    updatePosition () {
      this.prepareMeasure()
    },
    lazyUpdatePosition () {
      const { target, affixStyle } = this
      // Check position change before measure to make Safari smooth
      if (target && affixStyle) {
        const offsetTop = this.getOffsetTop
        const offsetBottom = this.getOffsetBottom
        const targetNode = target()

        if (targetNode && this.$refs.placeholderNode) {
          const targetRect = getTargetRect(targetNode)
          const placeholderRect = getTargetRect(this.$refs.placeholderNode)
          const fixedTop = getFixedTop(placeholderRect, targetRect, offsetTop)
          const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom)

          if (
            (fixedTop !== undefined && affixStyle.top === fixedTop) ||
            (fixedBottom !== undefined && affixStyle.bottom === fixedBottom)
          ) {
            return
          }
        }
      }
      this.prepareMeasure()
    }
  }
}
</script>

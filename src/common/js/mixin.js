/*
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-05-19 14:48:08
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2021-05-19 14:49:24
 */
export const dialogMixin = {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      }
    }
  },

  methods: {
    closeDialog() {
      this.isVisible = false;
    }
  }
};

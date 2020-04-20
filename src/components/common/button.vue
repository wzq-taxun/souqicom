<template>
  <el-button @click="submit()" :disabled="isDisable">点击</el-button>
</template>

<script>
export default {
  name: 'TestButton',
  data: function() {
    return {
      isDisable: false
    }
  },
  methods: {
    submit() {
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 1000)
    }
  }
}
</script>

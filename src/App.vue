<template>
  <div id="app">
    <img alt="logo" src="./assets/Apricity-Logo.png">
    <combo @change="onChangeCombo"></combo>
    <tab></tab>
  </div>
</template>

<script>

// components
import combo from './components/combobox.vue'
import tab from './components/tab.vue'

export default {
  name: 'app',
  components: {
    combo,
    tab
  },
  methods :{
    // If combobox has changed, alert table
    onChangeCombo : function ( val )
    {
      this.$children[1].update({value:val});
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

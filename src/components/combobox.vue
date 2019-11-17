<template>
  <div id="myCombo">
    <label>Select a variable: </label>
    <select v-model="selected" @change="onChange( $event )">
      <option v-for="option in options" v-bind:value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>

import axios from 'axios';  
export default {
  name: 'combo',
  data: function (){
    return {
      options: [],
      selected:''
    };
  },

  mounted : function () {
      this.initCombo(this);
  },
  methods: {
      // Initiatilize combobox with request to server
      initCombo: function (  ) {                                          

          axios.get('http://localhost:3000/api/getVariables')
          .then(response => {
            this.options = response.data;
          })
          .catch(e => {
            this.options = [{ text: 'Error during loading', value: '0' }]
          })

      },
      // alert parent that the value of the combobox has changed
      onChange : function( event ){
        this.$emit('change', this.options[event.target.value].text)
      }
  }
}
</script>

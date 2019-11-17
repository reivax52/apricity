<template>
  <div id="myTab" v-if="rows.length" >
    <table border=1>
      <thead>
        <tr>
          <th v-for="header in tableHeader">{{header}}</th>
        </tr>
      </thead>
       <tr v-for="row in rows">
          <td v-for="(column,idx) in row">{{ formatData(row[idx]) }}</td>
      </tr>  
    </table>
  </div>
</template>

<script>

import axios from 'axios'; 
export default {
  name: 'tab',
  props: {
  },
  data: function (){
    return {
      tableHeader : ["Value","Count","Average age"],
      rows:[]
    };
  },
  methods: {
    // Given an update event received from parent, update the data of the table by requesting in database
    update : function( event ){
      var varid = encodeURI(event.value);
      var req = "http://localhost:3000/api/getData/" + varid;
      axios.get(req)
      .then(response => {
        this.rows = response.data;
      })
      .catch(e => {
        this.rows = [];
        console.log("combobox.vue : initTab - Error during tab initalize");
      })    
    },
    // Format data with no decimals if number
    formatData(value) {
      let v = "";
      if (typeof(value) == "number")
      {
        let decimals = 0;
        if (Number.isInteger(value) == false)
        {
          decimals = 1;
        }
        let val = value.toFixed(decimals);
        v = val.toString();

      }
      else
      {
        v = value;
      }
      return v;
    }
  }
}

</script>
<style>
#myTab {
  display: inline-block;
  margin-top: 30px;
}
</style>
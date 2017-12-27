"use strict";
import Vue from "../../node_modules/vue/dist/vue.min.js";

(function(global){

  // global.Vue = require("../../node_modules/vue/dist/vue.min.js");

  var app;

  if(document.getElementById("app_ga")){

    app = global.app = new Vue({
      el: "#" + "app_ga",
      data: {
        json: global.json_obj
      },
      computed: {
        devices: function(){
          return this.json.reports[0].data.rows;
        },
        heads: function(){
          return this.json.reports[0].columnHeader.dimensions;
        }
      },
      mounted: function(){
        console.info("mounted");
      },
      created: function(){
        console.info("created");
        console.info(this.json);
        console.info(this.devices);
        console.info(this.heads);
      }

    });

  }


})(window);
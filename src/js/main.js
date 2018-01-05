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
      methods: {
        changeOrder: function(index){
          this.sort(index);
        },
        sort: function(index, order){
          this.devices.sort(function(a, b){
            var target_a = a.dimensions[index];
            var target_b = b.dimensions[index];
            var val_a = parseInt(a.metrics[0].values[0], 10);
            var val_b = parseInt(b.metrics[0].values[0], 10);
            if(order == "asc"){
              if(target_a < target_b){
                return -1;
              }
              if(target_a > target_b){
                return 1;
              }
              if(val_a < val_b){
                return -1;
              }
              if(val_a > val_b){
                return 1;
              }
            }else{
              if(target_a < target_b){
                return 1;
              }
              if(target_a > target_b){
                return -1;
              }
              if(val_a < val_b){
                return 1;
              }
              if(val_a > val_b){
                return -1;
              }
            }

            return 0;
          });
        },
        sortByValue: function(arr, order){
          arr.sort(function(a, b){
            var val_a = parseInt(a.metrics[0].values[0], 10);
            var val_b = parseInt(b.metrics[0].values[0], 10);
            if(order == "asc"){
              if(val_a < val_b){
                return -1;
              }
              if(val_a > val_b){
                return 1;
              }
            }else{
              if(val_a < val_b){
                return 1;
              }
              if(val_a > val_b){
                return -1;
              }
            }
            return 0;
          });
        }
      },
      mounted: function(){
        console.info("mounted");
        this.sortByValue(this.devices, "desc");
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
<template>
  <div>
    <MHeader :back="true">Top 10 players</MHeader>
    <div class="content">
      <div id="svg-top10" style="width: 1200px;height: 600px"></div>
    </div>
  </div>
</template>
<script>
  import * as d3 from 'd3';
  import MHeader from '../base/MHeader.vue';
  import {pieChart} from '../assets/script/d3util';
  import {getData} from "../api";

  export default {
    name: 'Top10.vue',
    data() {
      return {
        title: 'HEIGHT(cm)',
        url: 'http://localhost:8880/nba/height'
      };
    },
    components: {
      MHeader
    },
    mounted() {
      this.boxPlot('#svg-top10');
    },
    watch: {
      url(val) {
        if (val.endsWith('height')) {
          this.title = 'HEIGHT(cm)';
        }
        else if (val.endsWith('weight')) {
          this.title = 'WEIGHT(kg)';
        } else if (val.endsWith('bmi')) {
          this.title = 'BMI';
        }
        this.drawChart();
      }
    },
    methods: {
      drawChart() {
        this.boxPlot('#svg-top10');
      },
      async boxPlot(id) {
        d3.select(id).selectAll("*").remove();
        var data = await getData();
        console.log(data);
        console.log(id);
        var pieChartConfig = {
          mainDiv: id,
          colorRange: ["#f44842", "#f4b841", "#f4f141", "#46f441", "#41f4d9", "#4941f4", "#f441d6", "#f44842", "#f4b841", "#f4f141", "#46f441", "#41f4d9", "#4941f4", "#f441d6"],
          data: data,
          caption: "playerName",
          tooltipLable: "playerName",
          value: "count"
        };
        pieChart(pieChartConfig);

      }
    }
  }
</script>
<style>
  @import "../assets/css/line.css";
</style>

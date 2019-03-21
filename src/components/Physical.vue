<template>
  <div>
    <MHeader :back="true">physical data</MHeader>
    <div class="content">
      <div>
        <select v-model="url">
          <option value="http://localhost:8880/nba/height" selected="selected">height</option>
          <option value="http://localhost:8880/nba/weight">weight</option>
          <option value="http://localhost:8880/nba/bmi">BMI</option>
        </select>
      </div>
      <div id="chart" style="width: 1200px;height: 500px"></div>
    </div>
  </div>
</template>
<script>
  import {box, iqr} from "../assets/script/d3util";
  import MHeader from '../base/MHeader.vue';

  export default {
    name: 'Physical.vue',
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
      this.drawChart();
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
        this.boxPlot('#chart');
      },
      boxPlot(id) {
        d3.select(id).selectAll("*").remove();

        let labels = true;
        let margin = {top: 30, right: 50, bottom: 70, left: 50};
        let width = 1000 - margin.left - margin.right;
        let height = 400 - margin.top - margin.bottom;

        let min = Infinity;
        let max = -Infinity;

        let headTitle = this.title;
        d3.json(this.url, function (error, result) {
          let json = result.data;
          let data = new Array(json.length);
          for (let index in json) {
            data[index] = new Array();
            data[index][0] = json[index].key;
            data[index][1] = new Array();
            data[index][1] = json[index].value;
            data[index][2] = json[index].color;

            min = d3.min(json[index].value) < min ? d3.min(json[index].value) : min;
            max = d3.max(json[index].value) > max ? d3.max(json[index].value) : max;
          }

          let chart = box()
            .whiskers(iqr(1.5))
            .height(height)
            .domain([min, max])
            .showLabels(labels);

          let svg = d3.select(id).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "box")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          // the x-axis
          let x = d3.scale.ordinal()
            .domain(data.map(function (d) {
              console.log(d);
              return d[0]
            }))
            .rangeRoundBands([0, width], 0.7, 0.3);

          let xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

          // the y-axis
          let y = d3.scale.linear()
            .domain([min, max])
            .range([height + margin.top, 0 + margin.top]);

          let yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

          // draw the boxplots
          svg.selectAll(".box")
            .data(data)
            .enter().append("g")
            .attr("transform", function (d) {
              return "translate(" + x(d[0]) + "," + margin.top + ")";
            })
            .call(chart.width(x.rangeBand()));


          // add a title
          svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 + (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text(headTitle);

          // draw y axis
          svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("font-size", "16px");

          // draw x axis
          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height + margin.top + 10) + ")")
            .call(xAxis)
            .append("text")
            .attr("x", (width / 2))
            .attr("y", 10)
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .style("font-size", "16px");
        });
      }
    }
  }
</script>
<style>
  @import "../assets/css/boxline.css";
</style>

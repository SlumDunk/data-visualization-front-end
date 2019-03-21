<template>
  <div>
    <MHeader :back="true">team data</MHeader>
    <div class="content">
      <div id="svg-bar" style="width: 1200px;height: 500px"></div>
    </div>
  </div>
</template>
<script>
  import * as d3 from 'd3';
  import MHeader from '../base/MHeader.vue';

  export default {
    name: 'Team.vue',
    data() {
      return {
        title: 'number of weekly awards per team',
        url: 'http://localhost:8880/nba/teamrange'
      };
    },
    components: {
      MHeader
    },
    mounted() {
      this.$nextTick(() => {
        this.drawChart();
      })
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
        this.boxPlot('#svg-bar');
      },
      boxPlot(id) {
        d3.select(id).selectAll("*").remove();
// set the dimensions of the canvas
        let margin = {top: 20, right: 20, bottom: 70, left: 40},
          width = 1200 - margin.left - margin.right,
          height = 550 - margin.top - margin.bottom;

        let headTitle = this.title;
// set the ranges
        let x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

        let y = d3.scale.linear().range([height-50, 30]);

// define the axis
        let xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")


        let yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(10);


// add the SVG element
        let svg = d3.select(id).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


// load the data
        d3.json(this.url, function (error, json) {
          let data=json.data;
          data.forEach(function (d) {
            d.teamName = d.teamName;
            d.count = +d.count;
          });

          // scale the range of the data
          x.domain(data.map(function (d) {
            return d.teamName;
          }));
          y.domain([0, d3.max(data, function (d) {
            return d.count;
          })]);

          // add axis
          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height-50) + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)");

          svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("award");

          // add a title
          svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 + (margin.top / 12))
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text(headTitle);

          // Add bar chart
          svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
              return x(d.teamName);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
              return y(d.count);
            })
            .attr("height", function (d) {
              return height - 50-y(d.count);
            });

        });

      }
    }
  }
</script>
<style>
  @import "../assets/css/bar.css";
</style>

<template>
  <div>
    <MHeader :back="true">bmi data</MHeader>
    <div class="content">
      <div>
        <select v-model="url">
          <option value="http://localhost:8880/nba/bmirange/pg" selected="selected">point guard</option>
          <option value="http://localhost:8880/nba/bmirange/sg">shooting guard</option>
          <option value="http://localhost:8880/nba/bmirange/f">forward</option>
          <option value="http://localhost:8880/nba/bmirange/c">center</option>
          <option value="http://localhost:8880/nba/bmirange/sf">small forward</option>
          <option value="http://localhost:8880/nba/bmirange/pf">power forward</option>
          <option value="http://localhost:8880/nba/bmirange/g">guard</option>
          <option value="http://localhost:8880/nba/bmirange/f-c">forward center</option>
          <option value="http://localhost:8880/nba/bmirange/g-f">guard forward</option>
        </select>
      </div>
      <div id="svg" style="width: 1200px;height: 500px"></div>
    </div>
  </div>
</template>
<script>
  import * as d3 from 'd3';
  import MHeader from '../base/MHeader.vue';

  export default {
    name: 'BMI.vue',
    data() {
      return {
        title: 'Average BMI over Time Per Position-Point Guard',
        url: 'http://localhost:8880/nba/bmirange/pg'

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
        if (val.endsWith('pg')) {
          this.title = 'Average BMI over Time Per Position-Point Guard';
        }
        else if (val.endsWith('sg')) {
          this.title = 'Average BMI over Time Per Position-Shooting Guard';
        }else if (val.endsWith('sf')) {
          this.title = 'Average BMI over Time Per Position-Small Forward';
        } else if (val.endsWith('pf')) {
          this.title = 'Average BMI over Time Per Position-Power Forward';
        } else if (val.endsWith('f')) {
          this.title = 'Average BMI over Time Per Position-Forward';
        } else if (val.endsWith('c')) {
          this.title = 'Average BMI over Time Per Position-Center';
        } else if (val.endsWith('g')) {
          this.title = 'Average BMI over Time Per Position-Guard';
        } else if (val.endsWith('fc')) {
          this.title = 'Average BMI over Time Per Position-Forward Center';
        } else if (val.endsWith('gf')) {
          this.title = 'Average BMI over Time Per Position-Guard Forward';
        }
        this.drawChart();
      }
    },
    methods: {
      drawChart() {
        this.boxPlot('#svg');
      },
      boxPlot(id) {
        d3.select(id).selectAll("*").remove();

        let margin = {top: 30, right: 50, bottom: 70, left: 50};
        let width = 1000 - margin.left - margin.right;
        let height = 400 - margin.top - margin.bottom;

        let min_y = Infinity;
        let max_y = -Infinity;

        let min_x = Infinity;
        let max_x = -Infinity;
        let headTitle = this.title;
        d3.json(this.url, function (error, result) {
          let json = result.data;
          for (let index in json) {
            let item = json[index];
            let values = item.value;
            {
              for (let j = 0; j < values.length; j++) {
                min_y = values[j].bmi < min_y ? values[j].bmi : min_y;
                max_y = values[j].bmi > max_y ? values[j].bmi : max_y;

                min_x = parseInt(values[j].playerDraftYear) < min_x ? values[j].playerDraftYear : min_x;
                max_x = parseInt(values[j].playerDraftYear) > max_x ? values[j].playerDraftYear : max_x;
              }
            }
          }

          let svg = d3.select(id).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          // the x-axis
          let x = d3.scale.linear()
            .domain([min_x, max_x])
            .range([0, width]);


          let xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

          // the y-axis
          let y = d3.scale.linear()
            //.domain([min_y, max_y])
            .domain([19, 35])
            .range([height + margin.top, 0 + margin.top]);

          let yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

          // 7. d3's line generator
          var line = d3.svg.line()
            .x(function (d, i) {
              return x(parseInt(d.playerDraftYear));
            }) // set the x values for the line generator
            .y(function (d) {
              return y(d.bmi);
            }); // set the y values for the line generator


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


          for (let index in json) {
            let item = json[index];
            let linedata = item.value;
            //draw line
            svg.append("path")
              .datum(linedata) // 10. Binds data to the line
              .attr("fill", "none")
              .attr("stroke", item.color)
              .attr("stroke-width", "3px")
              .attr("d", line); // 11. Calls the line generator


            //draw point
            svg.selectAll(".dot")
              .data(linedata)
              .enter().append("circle") // Uses the enter().append() method
              .attr("class", "dot") // Assign a class for styling
              .attr("cx", function (d, i) {
                return x(parseInt(d.playerDraftYear))
              })
              .attr("cy", function (d) {
                return y(d.bmi);
              })
              .attr("r", 5);
          }

        });
      }
    }
  }
</script>
<style>
  @import "../assets/css/line.css";
</style>

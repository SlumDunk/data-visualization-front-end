<template>
  <div>
    <MHeader :back="true">east vs west</MHeader>
    <div class="content">
      <div id="svg-ew" style="width: 1200px;height: 500px"></div>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import MHeader from '../base/MHeader.vue';

  export default {
    name: 'EastWest.vue',
    data() {
      return {
        title: 'number of weekly awards per Conference',
        url: 'http://localhost:8880/nba/eastwest'
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
    methods: {
      drawChart() {
        this.boxPlot('#svg-ew');
      },
      boxPlot(id) {
        d3.select(id).selectAll("*").remove();
        let margin = {top: 20, right: 100, bottom: 30, left: 40},
          width = 1200 - margin.left - margin.right,
          height = 550 - margin.top - margin.bottom;
        let headTitle=this.title;
        let x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

        let y = d3.scale.linear()
          .rangeRound([height, 20]);

        let color = d3.scale.ordinal()
          .range(["red", "green"]);

        let xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

        let yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickFormat(d3.format(".2s"));

        let svg = d3.select(id).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let active_link = "0"; //to control legend selections and hover
        let legendClassArray = []; //store legend classes to select bars in plotSingle()
        let legendClassArray_orig = []; //orig (with spaces)
        let sortDescending; //if true, bars are sorted by height in descending order
        let restoreXFlag = false; //restore order of bars back to original


        d3.select("label")
          .select("input")
          .property("disabled", true)
          .property("checked", false);


        d3.json(this.url, function (error, json) {
          if (error) throw error;
          let data = json.data;

          color.domain(['West', 'East']);
          data.forEach(function (d) {
            let season = parseInt(d.season); //add to stock code
            let y0 = 0;
            d.season = season;
            d.ages = color.domain().map(function (name) {
              return {
                season: season,
                name: name,
                y0: y0,
                y1: y0 += +d[name],
                value: d[name],
                y_corrected: 0
              };
            });
            d.total = d.ages[d.ages.length - 1].y1;
            console.log(d);
          });

          //Sort totals in ascending order
          data.sort(function (a, b) {
            return a.season - b.season;
          });


          x.domain(data.map(function (d) {
            return d.season;
          }));
          y.domain([0, d3.max(data, function (d) {
            return d.total;
          })]);

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

          svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end");

          // add a title
          svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 + (margin.top / 12))
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text(headTitle);

          let state = svg.selectAll(".state")
            .data(data)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function (d) {
              return "translate(" + "0" + ",0)";
            });

          let height_diff = 0;  //height discrepancy when calculating h based on data vs y(d.y0) - y(d.y1)
          state.selectAll("rect")
            .data(function (d) {
              return d.ages;
            })
            .enter().append("rect")
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
              height_diff = height_diff + y(d.y0) - y(d.y1) - (y(0) - y(d.value));
              let y_corrected = y(d.y1) + height_diff;
              d.y_corrected = y_corrected //store in d for later use in restorePlot()

              if (d.name === "East") height_diff = 0; //reset for next d.season

              return y_corrected;
              // return y(d.y1);  //orig, but not accurate
            })
            .attr("x", function (d) { //add to stock code
              return x(d.season);
            })
            .attr("height", function (d) {
              //return y(d.y0) - y(d.y1); //heights calculated based on stacked values (inaccurate)
              return y(0) - y(d.value); //calculate height directly from value in csv file
            })
            .attr("class", function (d) {
              let classLabel = d.name.replace(/\s/g, ''); //remove spaces
              return "bars class" + classLabel;
            })
            .style("fill", function (d) {
              return color(d.name);
            });

          state.selectAll("rect")
            .on("mouseover", function (d) {

              let delta = d.y1 - d.y0;
              let xPos = parseFloat(d3.select(this).attr("x"));
              let yPos = parseFloat(d3.select(this).attr("y"));
              let height = parseFloat(d3.select(this).attr("height"))

              d3.select(this).attr("stroke", "blue").attr("stroke-width", 0.8);

              svg.append("text")
                .attr("x", xPos)
                .attr("y", yPos + height / 2)
                .attr("class", "tooltip")
                .text(d.name + ": " + delta);

            })
            .on("mouseout", function () {
              svg.select(".tooltip").remove();
              d3.select(this).attr("stroke", "pink").attr("stroke-width", 0.2);

            })


          let legend = svg.selectAll(".legend")
            .data(color.domain().slice().reverse())
            .enter().append("g")
            .attr("class", function (d) {
              legendClassArray.push(d.replace(/\s/g, '')); //remove spaces
              legendClassArray_orig.push(d); //remove spaces
              return "legend";
            })
            .attr("transform", function (d, i) {
              //return "translate(0," + i * 20 + ")";

              return "translate(" + 50 + "," + 30 * (i + 1) + ")";
            });

          //reverse order to match order in which bars are stacked
          legendClassArray = legendClassArray.reverse();
          legendClassArray_orig = legendClassArray_orig.reverse();

          legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color)
            .attr("id", function (d, i) {
              return "id" + d.replace(/\s/g, '');
            })
            .on("mouseover", function () {

              if (active_link === "0") d3.select(this).style("cursor", "pointer");
              else {
                if (active_link.split("class").pop() === this.id.split("id").pop()) {
                  d3.select(this).style("cursor", "pointer");
                } else d3.select(this).style("cursor", "auto");
              }
            })
            .on("click", function (d) {

              if (active_link === "0") { //nothing selected, turn on this selection
                d3.select(this)
                  .style("stroke", "black")
                  .style("stroke-width", 2);

                active_link = this.id.split("id").pop();
                plotSingle(this);

                //gray out the others
                for (let i = 0; i < legendClassArray.length; i++) {
                  if (legendClassArray[i] != active_link) {
                    d3.select("#id" + legendClassArray[i])
                      .style("opacity", 0.5);
                  } else sortBy = i; //save index for sorting in change()
                }

                //enable sort checkbox
                d3.select("label").select("input").property("disabled", false)
                d3.select("label").style("color", "black")
                //sort the bars if checkbox is clicked
                d3.select("input").on("change", change);

              } else { //deactivate
                if (active_link === this.id.split("id").pop()) {//active square selected; turn it OFF
                  d3.select(this)
                    .style("stroke", "none");

                  //restore remaining boxes to normal opacity
                  for (i = 0; i < legendClassArray.length; i++) {
                    d3.select("#id" + legendClassArray[i])
                      .style("opacity", 1);
                  }


                  if (d3.select("label").select("input").property("checked")) {
                    restoreXFlag = true;
                  }

                  //disable sort checkbox
                  d3.select("label")
                    .style("color", "#D8D8D8")
                    .select("input")
                    .property("disabled", true)
                    .property("checked", false);


                  //sort bars back to original positions if necessary
                  change();

                  //y translate selected category bars back to original y posn
                  restorePlot(d);

                  active_link = "0"; //reset
                }

              } //end active_link check


            });

          legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d) {
              return d;
            });

          // restore graph after a single selection
          function restorePlot(d) {
            //restore graph after a single selection
            d3.selectAll(".bars:not(.class" + class_keep + ")")
              .transition()
              .duration(1000)
              .delay(function () {
                if (restoreXFlag) return 3000;
                else return 750;
              })
              .attr("width", x.rangeBand()) //restore bar width
              .style("opacity", 1);

            //translate bars back up to original y-posn
            d3.selectAll(".class" + class_keep)
              .attr("x", function (d) {
                return x(d.season);
              })
              .transition()
              .duration(1000)
              .delay(function () {
                if (restoreXFlag) return 2000; //bars have to be restored to orig posn
                else return 0;
              })
              .attr("y", function (d) {
                //return y(d.y1); //not exactly correct since not based on raw data value
                return d.y_corrected;
              });

            //reset
            restoreXFlag = false;

          }

          // plot only a single legend selection
          function plotSingle(d) {

            let class_keep = d.id.split("id").pop();
            let idx = legendClassArray.indexOf(class_keep);

            //erase all but selected bars by setting opacity to 0
            d3.selectAll(".bars:not(.class" + class_keep + ")")
              .transition()
              .duration(1000)
              .attr("width", 0) // use because svg has no zindex to hide bars so can't select visible bar underneath
              .style("opacity", 0);

            //lower the bars to start on x-axis
            state.selectAll("rect").forEach(function (d, i) {

              //get height and y posn of base bar and selected bar
              let h_keep = d3.select(d[idx]).attr("height");
              let y_keep = d3.select(d[idx]).attr("y");

              let h_base = d3.select(d[0]).attr("height");
              let y_base = d3.select(d[0]).attr("y");

              let h_shift = h_keep - h_base;
              let y_new = y_base - h_shift;

              //reposition selected bars
              d3.select(d[idx])
                .transition()
                .ease("bounce")
                .duration(1000)
                .delay(750)
                .attr("y", y_new);

            })

          }

          //adapted change() fn in http://bl.ocks.org/mbostock/3885705
          function change() {

            if (this.checked) sortDescending = true;
            else sortDescending = false;

            let colName = legendClassArray_orig[sortBy];

            let x0 = x.domain(data.sort(sortDescending
              ? function (a, b) {
                return b[colName] - a[colName];
              }
              : function (a, b) {
                return b.total - a.total;
              })
              .map(function (d, i) {
                return d.State;
              }))
              .copy();

            state.selectAll(".class" + active_link)
              .sort(function (a, b) {
                return x0(a.season) - x0(b.season);
              });

            let transition = svg.transition().duration(750),
              delay = function (d, i) {
                return i * 20;
              };

            //sort bars
            transition.selectAll(".class" + active_link)
              .delay(delay)
              .attr("x", function (d) {
                return x0(d.season);
              });

            //sort x-labels accordingly
            transition.select(".x.axis")
              .call(xAxis)
              .selectAll("g")
              .delay(delay);


            transition.select(".x.axis")
              .call(xAxis)
              .selectAll("g")
              .delay(delay);
          }

        });

      }
    }
  }
</script>
<style>
  @import "../assets/css/stack-bar.css";
</style>

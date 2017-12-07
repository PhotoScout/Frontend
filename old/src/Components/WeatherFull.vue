<template>
    <section id="weather">
      <div class="slider">
          <span>Temperature</span>
          <div class="selector" :class="{right:currentCloud}" v-on:click="currentCloud=!currentCloud"></div>
          <span>Cloudiness</span>
      </div>
      <div id="weathergraph"></div>
      <div id="info" v-if="loaded">
          <div id="date">
            <span>{{formatDate(reports[selectedBar].dt_txt)}}</span>
            <span class="time">{{formatTime(reports[selectedBar].dt_txt)}}</span>
          </div>
          <i id="picto" class="owf owf-4x" :class="getClass(reports[selectedBar])"></i>
        <ul>
            <li><strong>{{reports[selectedBar].main.temp}}</strong>°C</li>
            <li>{{reports[selectedBar].weather[0].description}}</li>
            <li><strong>{{reports[selectedBar].wind.speed}}</strong>m/s {{toCardinalDirection(reports[selectedBar].wind.deg)}}</li>
            <li><strong>{{reports[selectedBar].clouds.all}}</strong>% cloudiness</li>
        </ul>
      </div>
  </section>
</template>

<script>
import api from '../api'
import SVG from 'svg.js'
import moment from 'moment'

export default {
    name: "weatherFull",
    props: [
        "guide"
    ],
    data () {
        return {
            loaded:false,
            selectedBar: 0,
            previousBar: 0,
            bars: [],
            colors: {
                highlight: "#F39C12",
                day: "#CCCCCC",
                night: "#333333",
                background: "#FCFCFC"
            },

            reports: [],
            // selectedBar: {
            //     object: {},
            //     color: {},
            //     id: -1
            // },
            currentCloud:false,
            draw: {},
            selectedFocal: [
                // "24 35"
            ],
        }
    },
    mounted() {
        // Get the report
        api.GetGuideWeather(
            this,
            data=>{
                this.reports = data.body.list
                this.loaded = true;
                this.drawWeather()
            },
            error => {
                console.log(error)
            },
            {id: this.guide.id}
        )
    },

    watch: {
        currentCloud: function(){
            this.draw.clear()

            this.drawBackground()
            if(this.currentCloud)
                this.drawCloud()
            else
                this.drawTemp()
        },
        selectedBar: function(){
            this.bars[this.selectedBar].fill({color: this.colors.highlight})

            let fillColor =  this.bars[this.previousBar].day ? this.colors.day : this.colors.night
            this.bars[this.previousBar].fill({color: fillColor})

            this.previousBar = this.selectedBar
        }
    },
    computed: {
        getCloudCoverage: function() {
            var clouds = []

            for(var i=0; i<this.reports.length; i++) {
                clouds.push(this.reports[i].clouds.all)
            }

            return clouds
        },

        getTemperature: function() {
            var temps = {
                max: 30,
                min: -5,
                list: []
            }

            for(var i=0; i<this.reports.length; i++) {
                var temp = this.reports[i].main.temp
                temps.list.push(temp)
                if(temp > temps.max)
                    temps.max = temp
                if(temp < temps.min)
                    temps.min = temp
            }

            return temps
        }
    },

    methods: {
        drawBackground: function(){
            for(let i=0; i<this.getTemperature.list.length; i++) {
                let w = 20
                let h = 400
                let x = i*25
                let y = 0

                let bar = this.draw.rect(w, h).move(x, y).attr('fill', this.colors.background)

                bar.mouseover(()=>{
                    this.selectedBar = i
                })
            }
        },


        drawTemp: function(){
            var tempData = this.getTemperature
            var unit = 150/(tempData.max-tempData.min)
            var day = ""
            this.bars = []

            for(let i=0; i<tempData.list.length; i++) {
                let fillColor = this.reports[i].sys.pod == "d" ? this.colors.day : this.colors.night
                fillColor = i == this.selectedBar ? this.colors.highlight : fillColor

                let w = 20
                let h = Math.abs(tempData.list[i])*unit
                let x = i*25
                let y = (Math.abs(tempData.max)*unit)-(tempData.list[i]>0?tempData.list[i]*unit:0)

                let bar = this.draw.rect(w, h).move(x, y).attr('fill', fillColor)
                bar.day = this.reports[i].sys.pod == "d"

                this.bars.push(bar)

                var newDay = moment(this.reports[i].dt_txt).format("DD[/]MM")
                if(day == "" || newDay != day) {
                    day = newDay

                    var text = this.draw.text(day).font({anchor:'right', family:'Raleway', size: 10}).move(x, 150)
                }

                bar.mouseover(()=>{
                    this.selectedBar = i
                })
            }

        },
        drawCloud: function(){
            var cloudData = this.getCloudCoverage
            var day = ""
            this.bars = []

            for(let i=0; i<cloudData.length; i++) {
                let fillColor = this.reports[i].sys.pod == "d" ? this.colors.day : this.colors.night
                fillColor = i == this.selectedBar ? this.colors.highlight : fillColor

                let w = 20
                let h = cloudData[i]*1.5
                let x = i*25
                let y = 150-cloudData[i]*1.5

                let bar = this.draw.rect(w, h).move(x, y).attr('fill', fillColor)
                bar.day = this.reports[i].sys.pod == "d"

                this.bars.push(bar)

                var newDay = moment(this.reports[i].dt_txt).format("DD[/]MM[/]YY")
                if(day == "" || newDay != day) {
                    day = newDay

                    var text = this.draw.text(day).font({anchor:'right', family:'Raleway', size: 10}).move(x, 150)
                }

                bar.mouseover(()=>{
                    this.selectedBar = i
                })
            }

        },
        toCardinalDirection: function(deg){
            var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
            return directions[ Math.round((deg % 360) / 45) % 8 ]
        },
        getClass: function(report){
            return "owf-" + report.weather[0].id + "-" + report.sys.pod
        },
        formatDate: function (date) {
            return moment(date).format("Do MMMM YY");
        },
        formatTime: function (date) {
            return moment(date).format("HH[h]mm");
        },
        drawWeather: function (){
            this.draw = SVG('weathergraph')
            this.draw.viewbox(0,0,1000,170)

            this.drawBackground()

            if(this.currentCloud)
                this.drawCloud()
            else
                this.drawTemp()

        }
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/colors.scss";
@import "../styles/owfont-regular.min.css";

#date {
    display: flex;
    flex-direction: column;
    font-size: 2em;
    margin-right: 3em;

    .time {
        font-size: 2.2em;
    }
}

#picto {
    font-size: 11em;
}

.slider {
    margin-top: 1em;
    color: black;
    display: flex;

    .selector {
        margin: 0 1em;
        width: 3em;
        height: 1.5em;
        background-color: $box-light-2;
        border: 1px solid #999;
        border-radius: 0.5em;
        position: relative;
        cursor: pointer;

        &:after{
            position: absolute;
            content: ' ';
            background-color: $primary-color-1;
            width: 1.5em;
            height: 1.5em;
            border-radius: 0.5em;
            top: 0;
            margin: -1px;
        }

        &.right {

            &:after {
                right: 0;
            }
        }
    }
}
</style>


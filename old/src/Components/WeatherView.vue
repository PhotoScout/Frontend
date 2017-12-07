<template>
<div>
  <ul id="reportView">
      <li v-for="report in getDailyReport">
          <i class="owf owf-4x" :class="getClass(report)"></i><span>{{formatDate(report.dt_txt)}}</span><span>{{report.main.temp}} °C</span>
      </li>
  </ul>
</div>
</template>

<script>
import moment from 'moment'
import api from '../api'

export default {
    name:'weatherView',
    props: [
        'id',
        'location'
    ],
    data () {
        return {
            reports: []
        }
    },
    mounted () {
        this.getReport()
    },
    methods: {
        getClass: function(report){
            return "owf-" + report.weather[0].id + "-" + report.sys.pod
        },
        getReport: function(){
            api.GetGuideWeather(
                this,
                data=>{
                    this.reports = data.body.list
                },
                error => {
                    console.log(error)
                },
                {id: this.id}
            )
        },
        formatDate: function (date) {
            return moment(date).format("MMM Do YY");
        }
    },
    computed: {
        getDailyReport: function(){
            var dailyReports = []

            for(var i = 0; i<this.reports.length; i++) {
                var currep = this.reports[i]
                var date = new Date(currep.dt_txt)

                if(date.getHours() == 12)
                    dailyReports.push(currep)
            }
            return dailyReports
        }
    },
    watch: {
        'location.latitude'(){
            this.getReport()
        }
    }
}
</script>

<style src="../styles/owfont-regular.min.css"></style>

<style lang="scss">
#reportView{
    list-style: none;
    display: flex;

    li{
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }
}
</style>

<template>
  <div id="guide">
    <hero :title="guide.title" image="guide.jpg" dark="true" top="-200px"></hero>
  </div>
</template>

<script>
import SurveyingMarmot from 'surveying-marmot-api'
import hero from './Hero'

export default {
  name: 'guide',
  components: {
    hero
  },
  data: () => {
    return {
      guide: {}
    }
  },
  props: [
    'guideName'
  ],
  mounted: function () {
    const sm = new SurveyingMarmot({url: 'http://127.0.0.1:5000'})
    sm.GetGuideInfo(this.$store.state.user.token, this.guideName).then(data => {
      this.guide = data
    }).catch(data => {
      console.log(data)
    })
  }
}
</script>

<style>

</style>

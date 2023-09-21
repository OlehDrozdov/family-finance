<template>
  <Pie
    :data="updateData"
    :options="updateOptions"
  />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import _merge from 'lodash/merge'

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'pie-chart',
  props: {
    chartData: {
      type: Object,
      required: true,
      default: () => ({})
    },
    chartOptions: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      defaultData: {
        datasets: [{
          backgroundColor: [
            '#4db6ac', '#9575cd', '#ef9a9a', '#7986cb', '#81c784',
            '#4dd0e1', '#7cb342', '#64b5f6', '#8d6e63', '#ff8a65'
          ],
          borderWidth: 1,
          borderColor: '#263238'
        }]
      },
      defaultOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
        }    
      }
    }
  },
  computed: {
    updateData() {
      return this.setupBackgroundColors(_merge({}, this.defaultData, this.chartData));
    },
    updateOptions() {
      return _merge({}, this.defaultOptions, this.chartOptions);
    }
  },
  methods: {
    setupBackgroundColors(data) {
      const backgroundColors = data.datasets[0].backgroundColor;
      const needColors = data.labels.length - backgroundColors.length;

      if (needColors > 0) {
        for (let i = 0; i < needColors; i++) {
          let newColor = this.getRandomColor();

          while (!this.isColorUnique(newColor, backgroundColors) ) {
            newColor = this.getRandomColor();
          }

          backgroundColors.push(newColor);
        }
      }

      return data;
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
    },
    isColorUnique(newColor, colorArray) {
      return !colorArray.includes(newColor);
    }
  },
  components: {
    Pie
  }
}
</script>
<template>
    <div>
        <div ref="ChartCP"></div>
    </div>
</template>

<script setup lang="ts">
interface StatDay {
    "formattedDate": string,
    "total": Number,
    "validated": Number
}
import { ref, onMounted, defineEmits } from 'vue'
const ChartCP = ref()
const props = defineProps({
    statsDays: {type:Array<StatDay>, default:null},
})

onMounted(async () => {
    const ApexCharts = (await import('apexcharts')).default;
    let stats = props.statsDays?props.statsDays:[];
    let series = stats.map(it => it.total);
    let categories = stats.map(it => it.formattedDate);
	let dayTime = 86400000
	let timeRef = (new Date(categories[6])).getTime();
	let myTimes = stats.reduce(
		(prev, it) => {
			let val = Math.floor((((new Date(it.formattedDate)).getTime() - timeRef)/dayTime)/7) + 2;

			if(2 > val) {
				val = 1
			}

			if(!prev[val]) {
				prev[val] = 0;
			}
			prev[val] = prev[val] + it.total

			return prev

		}, {}  );
    series = Object.values(myTimes);
    categories = Object.keys(myTimes).map(cat => "Semaine " + cat);

	console.log(myTimes);

	//console.log(((new Date(categories[9])).getTime() - (new Date(categories[8])).getTime())/dayTime);
    (new ApexCharts(ChartCP.value,
	{
      		chart: {
      			type: "bar",
      			fontFamily: 'inherit',
      			height: 240,
      			parentHeightOffset: 0,
      			toolbar: {
      				show: false,
      			},
      			animations: {
      				enabled: false
      			},
      		},
      		plotOptions: {
      			bar: {
      				columnWidth: '50%',
      			}
      		},
      		dataLabels: {
      			enabled: false,
      		},
      		fill: {
      			opacity: 1,
      		},
      		series: [{
      			name: "Nombre d'enregistrement",
      			data: [0, 0, 0, 0]
      		},{
      			name: "Superficie Total",
      			data: [0, 0, 0, 0]
      		},{
      			name: "Superficie exploitée",
      			data: [0, 0, 0, 0]
      		},{
      			name: "Superficie boisée",
      			data: [0, 0, 0, 0]
      		}],
      		tooltip: {
      			theme: 'dark'
      		},
      		grid: {
      			padding: {
      				top: -20,
      				right: 0,
      				left: -4,
      				bottom: -4
      			},
      			strokeDashArray: 4,
      		},
      		xaxis: {
      			labels: {
      				padding: 0,
      			},
      			tooltip: {
      				enabled: false
      			},
      			axisBorder: {
      				show: false,
      			},
      			type: 'string',
      		},
      		yaxis: {
      			labels: {
      				padding: 4
      			},
      		},
      		labels: [
      			'Kinshasa', 'Kongo-centrale', 'Kasaï', 'Kwilu'
      		],
      		colors: [tabler.getColor("azure"), tabler.getColor("yellow"), tabler.getColor("teal"), tabler.getColor("muted")],
      		legend: {
      			show: true,
      		},
      	})).render();

})

</script>

<template>
    <div>
        <div ref="ChartCarburant"></div>
    </div>
</template>

<script setup lang="ts">
interface StatDay {
    "formattedDate": string,
    "total": Number,
    "validated": Number
}
import { ref, onMounted, defineEmits } from 'vue'
const ChartCarburant = ref()
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
    (new ApexCharts(ChartCarburant.value,{
      		chart: {
      			type: "donut",
      			fontFamily: 'inherit',
      			height: 240,
      			sparkline: {
      				enabled: true
      			},
      			animations: {
      				enabled: false
      			},
      		},
      		fill: {
      			opacity: 1,
      		},
      		series: [1, 1, 1, 1, 1, 1, 1, 1],
      		labels: [      			
				'Gestion sociale et environnementale', 
				'FBR (Financement Basée sur les Résultats)', 
				'Préparation du terrain',
				'Pépinière',
				'Plantation',
				'Entreposage',
				'Vente groupée',
				'Comptabilité et gestion',
			  ],
      		tooltip: {
      			theme: 'dark'
      		},
      		grid: {
      			strokeDashArray: 4,
      		},
      		colors: [tabler.getColor("azure"), tabler.getColor("gray-300", 0.8), tabler.getColor("teal", 0.6), tabler.getColor("teal")],
      		legend: {
      			show: true,
      			position: 'bottom',
      			offsetY: 12,
      			markers: {
      				width: 10,
      				height: 10,
      				radius: 100,
      			},
      			itemMargin: {
      				horizontal: 8,
      				vertical: 8
      			},
      		},
      		tooltip: {
      			fillSeriesColor: false
      		},
      	})).render();

})

</script>

<template>
	<div class="github-stats" :class="{ 'has-header': showHeader }">
		<div v-if="isLoading">Loading</div>
		<div v-else class="metric">
			<v-icon :name="icon" :xLarge="true"></v-icon>
			<p class="metric-text">{{ repo[statistic] }}</p>
		</div>
	</div>
</template>

<script>
import { useApi } from '@directus/extensions-sdk' 
import { ref, watch } from 'vue'

export default {
	props: {
		showHeader: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: String,
			default: '',
		},
		repo: {
			type: String,
			default: '',
		},
		statistic: {
			type: String,
			default: 'stars',
		},
	},
	setup(props) {
		const api = useApi()
		const isLoading = ref(true)
		const repo = ref({})
		async function fetchData() {
			isLoading.value = true
			const response = await api.get(`/github-repo/${props.owner}/${props.repo}`)
			repo.value = response.data
			isLoading.value = false
		}
		fetchData()
		watch([() => props.owner, () => props.repo], fetchData);

		return { isLoading, repo }
	},
	computed: {
		icon() {
			if(this.statistic == 'stars') return 'star'
			if(this.statistic == 'issues') return 'adjust'
			if(this.statistic == 'prs') return 'merge'
			if(this.statistic == 'forks') return 'fork_right'
			if(this.statistic == 'watches') return 'visibility'
			if(this.statistic == 'contributors') return 'groups'
		}
	}
};
</script>

<style scoped>
.github-stats {
	padding: 12px;
	height: 100%;
}

.github-stats.has-header {
	padding: 0 12px;
}

.metric {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5em;
	justify-content: center;
	width: 100%;
	height: 100%;
	font-weight: 800;
	white-space: nowrap;
	line-height: 1.2;
	padding: 12px;
	font-family: var(--theme--font-family-sans-serif);
}
.metric-text {
	min-width: min-content;
	min-height: min-content;
	text-transform: capitalize;
	font-size: 3em;
}

.metric-id {
	font-weight: 600;
}
</style>

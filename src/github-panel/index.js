import PanelComponent from './panel.vue';
import preview from './preview.js';

export default {
	id: 'github-panel',
	name: 'GitHub Repo Stats',
	icon: 'query_stats',
	description: 'Get key stats from a GitHub repository.',
	component: PanelComponent,
	options: [
		{
			field: 'owner',
			name: 'Owner',
			type: 'string',
			meta: {
				interface: 'input',
				width: 'half',
			},
		},
		{
			field: 'repo',
			name: 'Repo',
			type: 'string',
			meta: {
				interface: 'input',
				width: 'half',
			},
		},
		{
			field: 'statistic',
			name: 'Statistic',
			type: 'string',
			schema: {
				default_value: 'stars'
			},
			meta: {
				interface: 'select-dropdown',
				options: {
					choices: [
						{
							text: 'Stars',
							value: 'stars'
						},
						{
							text: 'Issues',
							value: 'issues'
						},
						{
							text: 'Pull Requests',
							value: 'prs'
						},
						{
							text: 'Forks',
							value: 'forks'
						},
						{
							text: 'Watches',
							value: 'watches'
						},
						{
							text: 'Contributors',
							value: 'contributors'
						},
					]
				}
			}
		}
	],
	minWidth: 12,
	minHeight: 8,
	preview
};

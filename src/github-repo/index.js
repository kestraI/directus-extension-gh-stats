import { Octokit } from "octokit"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export default (router) => {
	router.get('/:owner/:repo', async (req, res) => {
		const { owner, repo } = req.params
		const { data } = await octokit.request('GET /repos/{owner}/{repo}', { owner, repo })

		async function getPage(type, page) {
			const { data } = await octokit.request(`GET /repos/{owner}/{repo}/${type}`, { 
				owner, repo, page,
				per_page: 100
			})
			return data.length
		}

		async function getCount(type) {
			let page = 1
			let total = null
			while(!total) {
				const count = await getPage(type, page)
				count == 100 ? page++ : total = (page * 100) + count - 100
			}
			return total
		}

		res.json({
			stars: data.stargazers_count,
			issues: data.open_issues,
			forks: data.forks,
			watches: data.subscribers_count,
			contributors: await getCount('contributors'),
			prs: await getCount('pulls') 
		})
	})
}
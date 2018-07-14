tilde.url = {}
tilde.url.viewmode = 'viewmode'
tilde.url.dataset = 'dataset'
tilde.url.sorting = 'sorting'

tilde.url.artists = 'artists'
tilde.url.directors = 'directors'
tilde.url.scientists = 'scientists'

tilde.url.streak_middle = 'streak_middle'
tilde.url.streak_length = 'streak_length'
tilde.url.model_fit = 'model_fit'
tilde.url.career_length = 'career_length'
tilde.url.time_to_first_peak = 'time_to_first_peak'

tilde.url.default = 'default'
tilde.url.cramped = 'cramped'
tilde.url.massive = 'massive'

tilde.info_text = [
	{t:'About this Visual',i:'Do professionals experience periods of heightened performance during their lifetime? How does this affect their careers?<br><br>This visualization was created to explore these "hot streak" features across the careers of thousands of individuals.<br>A suplemental piece for <a href="https://insight.kellogg.northwestern.edu/article/career-hot-streaks" target="_blank">Kellogg Insight<a>'},
	{t:'Data',i:'<a href="https://lu-liu.github.io/hotstreaks/" target="_blank">Available here</a><br><br><b>Exclusions and limitations</b>:<br><a href="https://static-content.springer.com/esm/art%3A10.1038%2Fs41586-018-0315-8/MediaObjects/41586_2018_315_MOESM1_ESM.pdf" target="_blank">Data Methodology Document</a><br><b>Artists</b>: Artists were selected from two online databases, based on the hammer price of pieces sold at auction. This is the primary factor for inclusion and exclusion of artists.<br><b>Directors</b>: Data was gathered from IMDb and directors needed to have at least 15 movies and 10 years of career length.<br><b>Scientists</b>: Scientists were selected from Google Scholar and Web of Science, so many private or exclusive publications are not included.'},
	{t:'Credit and Citation',i:'<b>Citation</b>: Lu Liu, Yang Wang, Roberta Sinatra, C. Lee Giles, Chaoming Song, & Dashun Wang. “Hot Streaks in Artistic, Cultural, and Scientific Careers.” Nature, 2018, doi:10.1038/s41586-018-0315-8<br><br><b>Paper</b>: <a href="https://www.nature.com/articles/s41586-018-0315-8" target="_blank">Available here</a><br><br><b>Visualization</b>: <a href="https://twitter.com/Frankly_Data" target="_blank">Frank Elavsky</a>, <a href="https://www.it.northwestern.edu/research/about/rcs-staff.html#Frank%20Elavsky" target="_blank">Research Computing, Northwestern University</a>'},
	{t:'Options',i:'<b>Change Dataset</b>:<div id="show_artists" class="reloader" onclick="tilde.set(tilde.url.dataset,tilde.url.artists)">Artists</div><div id="show_directors" class="reloader" onclick="tilde.set(tilde.url.dataset,tilde.url.directors)">Directors</div><div id="show_scientists" class="reloader" onclick="tilde.set(tilde.url.dataset,tilde.url.scientists)">Scientists</div><br><b>Change Sorting</b>:<div class="reloader" onclick="tilde.set(tilde.url.sorting,tilde.url.streak_middle)">Early to Late Streaks</div><div class="reloader" onclick="tilde.set(tilde.url.sorting,tilde.url.streak_length)">Short to Long Streaks</div><div class="reloader" onclick="tilde.set(tilde.url.sorting,tilde.url.model_fit)">Best to Worst Model Fitting</div><div class="reloader" onclick="tilde.set(tilde.url.sorting,tilde.url.career_length)">Few to Many Works Produced</div><div class="reloader" onclick="tilde.set(tilde.url.sorting,tilde.url.time_to_first_peak)">When Best Work Appeared</div><br><b>Change Display Style</b>:<div class="reloader" onclick="tilde.set(tilde.url.viewmode,tilde.url.default)">Default (has interface)</div><div>Advanced Views:<div class="reloader" onclick="tilde.set(tilde.url.viewmode,tilde.url.cramped)">All data, view compressed</div><div class="reloader" onclick="tilde.set(tilde.url.viewmode,tilde.url.massive)">All data, uncompressed</div>'}
]
tilde.sorting_text = {
	'streak_middle':{
		"t":"Early to Late Streaks (by streak-middle)",
		"i":"<i>Explanation</i><br>We took the first and last moments that a person streaked in their career, found the point between them, and then sorted based on when this middle point occurred relative to their career."
	},
	'streak_length':{
		"t":"Short to Long Streaks (by proportion of years)",
		"i":"<i>Explanation</i><br>We found the years a person spent in their streak and divided that by the total years in their career. We sorted by this resulting number."
	},
	'model_fit':{
		"t":"Best to Worst Model Fitting (by r-squared value)",
		"i":"<i>Explanation</i><br>Every career has an r-squared value, based on how well it fits the 'hot streak' model. We sorted all the careers based on this value, from the highest to lowest."
	},
	'career_length':{
		"t":"Few to Many Works Produced (by total number of works)",
		"i":"<i>Explanation</i><br>We counted how many works an individual produced in their career and sorted from least to most."
	},
	'time_to_first_peak':{
		"t":"When Best Work Appeared (in years, proportion to their career)",
		"i":"<i>Explanation</i><br>We found when in someone's career they had their highest-impact work and sorted from earliest to latest. We based this sorting on years, not proportion of total works."
	},
}
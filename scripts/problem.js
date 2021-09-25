function build_problem(id) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", `https://dhruva-shashi.github.io/uvce-hashcode-hub/json-files/${id}.json`, false);
	xmlHttp.send(null);

	var data = JSON.parse(xmlHttp.responseText);

    var content = document.getElementById("problem-pane");
	
	var web_content = "";

	web_content += `
	<div class="sub-header">
		<div class="problem-title">
			${data['name']}
		</div>
		<input type="button" value="Make Submission" id="open-modal">
	</div>`;

	web_content += `<div class="problem-statement">`;
	for (var i = 0; i < data['statement'].length; i++)
		web_content += `<p>${data['statement'][i]}</p>`;
	web_content += '</div>';

	web_content += `
	<div class="specifications">
		<div class="subhead">
			Input Format
		</div>

		<ul>`;
	for (var i = 0; i < data['input-format'].length; i++)
		web_content += `<li>${data['input-format'][i]}</li>`;
	web_content += `</ul>
	</div>`;

	web_content += `
	<div class="specifications">
		<div class="subhead">
			Constraints
		</div>

		<ul>`;
	for (var i = 0; i < data['constraints'].length; i++)
		web_content += `<li>${data['constraints'][i]}</li>`;
	web_content += `</ul>
	</div>`;

	web_content += `
	<div class="specifications">
		<div class="subhead">
			Output Format
		</div>

		<ul>`;
	for (var i = 0; i < data['output-format'].length; i++)
		web_content += `<li>${data['output-format'][i]}</li>`;
	web_content += `</ul>
	</div>`;

	content.innerHTML += web_content;
}
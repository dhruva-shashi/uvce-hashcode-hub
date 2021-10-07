function build_problem(id) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", `https://dhruva-shashi.github.io/uvce-hashcode-hub/json-files/${id}.json`, false);
	xmlHttp.send(null);

	var data = JSON.parse(xmlHttp.responseText);

    var content = document.getElementById("problem-pane");
	
	var web_content = "";

	var i;

	web_content += `
	<div class="sub-header">
		<div class="problem-title">
			${data['name']}
		</div>
		<input type="button" value="Make Submission" id="open-modal">
	</div>`;

	web_content += `<div class="problem-statement">`;
	for (i = 0; i < data['statement'].length; i++)
		web_content += `<p>${data['statement'][i]}</p>`;
	web_content += '</div>';

	web_content += `
	<div class="specifications">
		<div class="subhead">
			Input Format
		</div>

		<ul>`;
	for (i = 0; i < data['input-format'].length; i++)
		web_content += `<li>${data['input-format'][i]}</li>`;
	web_content += `</ul>
	</div>`;

	web_content += `
	<div class="specifications">
		<div class="subhead">
			Constraints
		</div>

		<ul>`;
	for (i = 0; i < data['constraints'].length; i++)
		web_content += `<li>${data['constraints'][i]}</li>`;
	web_content += `</ul>
	</div>`;

	web_content += `
	<div class="specifications">
		<div class="subhead">
			Output Format
		</div>

		<ul>`;
	for (i = 0; i < data['output-format'].length; i++)
		web_content += `<li>${data['output-format'][i]}</li>`;
	web_content += `</ul>
	</div>`;

	web_content += `
	<div class="specifications">
		<div class="subhead">
			Download Input Files
		</div>`;
	for (i = 0; i < parseInt(data['number-files']); i++)
		web_content += `
		<a href="../input-files/${id}/input-${String.fromCharCode(97+i)}.txt" download="input-${String.fromCharCode(97+i)}.txt">
			<div class="input-file">
				<img src="../images/download-icon.png">
				Input ${String.fromCharCode(65+i)}
			</div>
		</a>`;
	web_content += '</div>';

	web_content += `
	<div class="modal" id="modal">
		<div class="modal-content">
			<div class="submission-pane">`;
			
	for (i = 0; i < parseInt(data['number-files']); i++)
		web_content += `
		<div class="file-upload">
			<input type="file" id="input-file-${String.fromCharCode(97+i)}" accept=".txt">
			<input type="button" id="submit-${String.fromCharCode(97+i)}" value="Choose File - ${String.fromCharCode(65+i)}">
			<div id="file-name-${String.fromCharCode(97+i)}" class="file-name">Upload file</div>
		</div>`;

	web_content += `
		<div class="files-submit">
			<input type="button" id="submit-all" value="Submit">
		</div>
	</div>`;

	web_content += `
		<div class="prev-submissions">
			<table>
				<tr>
					<th>
						Input
					</th>
					<th>
						Last Submission
					</th>
					<th>
						Best score
					</th>
				</tr>`;

	for (i = 0; i < parseInt(data['number-files']); i++) {
		web_content += `
		<tr>
			<td>
				${String.fromCharCode(65+i)}
			</td>
			<td id="last-submission-${String.fromCharCode(97+i)}">
				0
			</td>
			<td id="best-score-${String.fromCharCode(97+i)}">
				0
			</td>
		</tr>`;
	}

	web_content += `
					</table>
				</div>
			</div>
		</div>
	</div>`;

	content.innerHTML += web_content;

	var modal = document.getElementById("modal");
	var open_modal = document.getElementById("open-modal");

	open_modal.addEventListener("click", function() {
		modal.style.display = "block";
	});

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

	var file_submit = document.getElementById('submit-all');

	function updateCookie() {
		var s = '';

		for (i = 0; i < parseInt(data['number-files']); i++) {
			const best = document.getElementById(`best-score-${String.fromCharCode(97+i)}`);
			s += parseInt(best.innerHTML);
			s += ' ';
		}

		document.cookie = 'score='+s;

		alert(s);
	}

	function readCookie() {
		var s = document.cookie.split('=')[1].split(' ');

		for (i = 0; i < parseInt(data['number-files']); i++) {
			const best = document.getElementById(`best-score-${String.fromCharCode(97+i)}`);
			best.innerHTML = s[i];
		}
	}

	if (document.cookie == '')
		updateCookie();
	else
		readCookie();

	file_submit.addEventListener("click", function() {
		var arr = document.cookie.split('=')[1].split(' ');

		for (i = 0; i < parseInt(data['number-files']); i++)
			arr[i] = parseInt(arr[i]);

		alert(arr);

		for (i = 0; i < parseInt(data['number-files']); i++) {
			const file_input = document.getElementById(`input-file-${String.fromCharCode(97+i)}`);

			if (file_input.files.length > 0) {
				var xmlHttp = new XMLHttpRequest();
				xmlHttp.open("GET", `https://dhruva-shashi.github.io/uvce-hashcode-hub/input-files/${data['id']}/input-${String.fromCharCode(97+i)}.txt`, false);
				xmlHttp.send(null);
			
				const input = xmlHttp.responseText.split(/\n/);
			
				const reader = new FileReader();
			
				const res = document.getElementById(`last-submission-${String.fromCharCode(97+i)}`);
				const file_name = document.getElementById(`file-name-${String.fromCharCode(97+i)}`);
				const best = document.getElementById(`best-score-${String.fromCharCode(97+i)}`);
			
				reader.onload = function() {
					const output = reader.result.split(/\n/);
			
					const final_score = evaluate(input, output);
			
					if (final_score > parseInt(best.innerHTML)) {
						best.innerHTML = final_score;
						arr[i] = final_score;
					}
			
					res.innerHTML = final_score;
					file_input.value = null;
					file_name.innerHTML = 'Upload file';
				}
			
				reader.readAsText(file_input.files[0]);
			}
		}

		s = ''

		for (i = 0; i < parseInt(data['number-files']); i++) {
			s += arr[i];
			s += ' ';
		}

		document.cookie = 'score='+s;

		alert(document.cookie);
	});

	for (i = 0; i < parseInt(data['number-files']); i++) {
		const substitute_button = document.getElementById(`submit-${String.fromCharCode(97+i)}`);
		const real_button = document.getElementById(`input-file-${String.fromCharCode(97+i)}`);
		const file_name = document.getElementById(`file-name-${String.fromCharCode(97+i)}`);
		const j = i;

		substitute_button.addEventListener("click", function() {
			real_button.click();
		});

		real_button.addEventListener("change", function() {
			if (real_button.value) {
				file_name.innerHTML = real_button.files[0].name;
				substitute_button.value = `Change file - ${String.fromCharCode(65+j)}`;
			}
		});
	}
}
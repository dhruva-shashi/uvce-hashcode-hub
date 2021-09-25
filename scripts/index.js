function build_index() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'https://dhruva-shashi.github.io/uvce-hashcode-hub/json-files/index.json', false);
	xmlHttp.send(null);

	var data = JSON.parse(xmlHttp.responseText);

	card = document.getElementById('content');
	card.innerHTML = "";

	for (var i = 0; i < data.length; i++) {
		card.innerHTML += `
			<div class = "card-container">
				<div class = "card">
					<div class = "card-header">
						<div class = "title">
							${data[i]["problem-name"]}
						</div>
						<div class = "date">
							${data[i]["date-added"]}
						</div>
					</div>

					<div class = "description">
						${data[i]["problem-description"]}
					</div>

					<div class = "button-container">
						<a href = "problems/${data[i].id}.html">
							<input type = "button" value = "Solve Problem">
						</a>
					</div>
				</div>
			</div>
		`;
	}
}


function hello() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'https://dhruva-shashi.github.io/uvce-hashcode-hub/data.json', false );
	xmlHttp.send(null);

	var data = JSON.parse(xmlHttp.responseText)

	alert(data[0]['problem-name']);
}

function buildTable() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'https://dhruva-shashi.github.io/uvce-hashcode-hub/data.json', false);
	xmlHttp.send(null);

	var data = JSON.parse(xmlHttp.responseText);

	card = document.getElementById('content');

	for (var i = 0; i < data.length; i++) {
		card_container = `
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
						<a href = "problems/${data[i].id}/${data[i].id}.html">
							<input type = "button" value = "Solve Problem">
						</a>
					</div>
				</div>
			</div>
		`;

		card.innerHTML += card_container;
	}
}


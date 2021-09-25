function build_problem(id) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", `https://dhruva-shashi.github.io/uvce-hashcode-hub/json-files/${id}.json`, false);
	xmlHttp.send(null);

	var data = JSON.parse(xmlHttp.responseText);

    
}
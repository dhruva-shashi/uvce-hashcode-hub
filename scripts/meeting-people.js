function evaluate(ch) {
    alert('Hello from meeting people');

    var file_selector = document.getElementById(`input-file-${ch}`);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", `https://dhruva-shashi.github.io/uvce-hashcode-hub/input-files/meeting-people/input-${ch}.txt`, false);
	xmlHttp.send(null);

    var input = xmlHttp.responseText;

    var arr = input.split('\n');

    /*
    var file_input = document.getElementById(`input-file-${ch}`);

    var reader = new FileReader();

    var str = reader.readAsText(file_input.files[0]);
    */

    alert(arr);
    alert(str);
}
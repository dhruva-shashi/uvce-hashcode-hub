function evaluate(ch) {
    var file_selector = document.getElementById(`input-file-${ch}`);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", `https://dhruva-shashi.github.io/uvce-hashcode-hub/input-files/meeting-people/input-${ch}.txt`, false);
	xmlHttp.send(null);

    var input = xmlHttp.responseText.split(/\n/);

    var reader = new FileReader();

    var file_input = document.getElementById(`input-file-${ch}`);
    var res = document.getElementById(`last-submission-${ch}`);
    var file_name = document.getElementById(`file-name-${ch}`);

    var temp;

    reader.onload = function() {
        var output = reader.result.split(/\n/);

        var i;

        var final_score = 0;
        
        temp = input[0].split(' ');
        var n = parseInt(temp[0]);

        var a = input[1].split(' ');

        for (i = 0; i < n; i++)
            a[i] = parseInt(a[i]);

        var b = input[2].split(' ');

        for (i = 0; i < n; i++)
            b[i] = parseInt(b[i]);

        var k = parseInt(output[0]);
        var c = output[1].split(' ');

        for (i = 0; i < k; i++)
            c[i] = parseInt(c[i]);
            
        var f = []
        for (i = 0; i < k; i++)
            f[i] = 0;

        var overflow = false;
        var duplicate = false;
        var wrong_index = false;
            
        for (i = 0; i < k; i++) {
            if (c[i] < 1 || c[i] > n) {
                wrong_index = true;
                break;
            }

            f[c[i]-1]++;

            if (f[c[i]-1] > 1) {
                duplicate = true;
                break;
            }

            if (a[c[i]-1] >= i+1)
                final_score += b[c[i]-1];
        }

        if (overflow || duplicate || wrong_index)
            final_score = 0;

        res.innerHTML = final_score;
        file_input.value = null;
        file_name.innerHTML = 'Upload file';
    }

    reader.readAsText(file_input.files[0]);
}
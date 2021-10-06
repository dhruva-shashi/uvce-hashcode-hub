function evaluate(ch) {
    var file_selector = document.getElementById(`input-file-${ch}`);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", `https://dhruva-shashi.github.io/uvce-hashcode-hub/input-files/booksack/input-${ch}.txt`, false);
	xmlHttp.send(null);

    var input = xmlHttp.responseText.split(/\n/);

    var reader = new FileReader();

    var file_input = document.getElementById(`input-file-${ch}`);
    var res = document.getElementById(`last-submission-${ch}`);
    var file_name = document.getElementById(`file-name-${ch}`);
    var best = document.getElementById(`best-score-${ch}`);

    var temp;

    reader.onload = function() {
        var output = reader.result.split(/\n/);

        var i;

        var final_score = 0;
        
        temp = input[0].split(' ');

        var m = parseInt(temp[0]);
        var n = parseInt(temp[1]);
        var a = input[1].split(' ');

        for (i = 0; i < n; i++)
            a[i] = parseInt(a[i]);

        var k = parseInt(output[0]);
        var b = output[1].split(' ');

        for (i = 0; i < k; i++)
            b[i] = parseInt(b[i]);
            
        var f = []
        for (i = 0; i < k; i++)
            f[i] = 0;

        var overflow = false;
        var duplicate = false;
        var wrong_index = false;
            
        for (i = 0; i < k; i++) {
            if (b[i] < 1 || b[i] > n) {
                wrong_index = true;
                break;
            }

            f[b[i]-1]++;

            if (f[b[i]-1] > 1) {
                overflow = true;
                break;
            }

            final_score += a[b[i]-1];
        }
        
        if (final_score > m)
            overflow = true;

        if (overflow || duplicate || wrong_index)
            final_score = 0;

        if (final_score > parseInt(best.innerHTML))
            best.innerHTML = final_score;

        res.innerHTML = final_score;
        file_input.value = null;
        file_name.innerHTML = 'Upload file';
    }

    reader.readAsText(file_input.files[0]);
}
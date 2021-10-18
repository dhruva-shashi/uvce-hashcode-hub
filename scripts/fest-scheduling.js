function evaluate(input, output) {
    var i, j, it;

    var temp;

    var final_score = 0;

    temp = input[0].split(' ');

    var n = parseInt(temp[0]);
    var m = parseInt(temp[1]);
    var k = parseInt(temp[2]);

    var a = [];

    for (i = 0; i < n*m; i++) {
        temp = input[i+1].split(' ');
        a.push([]);

        for (j = 0; j < k; j++)
            a[i].push(parseInt(temp[j]));
    }
    
    for (i = 0; i < n; i++) {
        temp = output[i].split(' ');

        if (temp.length != m) {
            final_score = 0;
            break;
        }

        for (j = 0; j < m; j++)
            temp[j] = parseInt(temp[j]);
        
        var b = new Set();

        for (j = 0; j < m; j++)
            for (it = 0; it < k; it++)
                b.add(a[temp[j]-1][it]);

        final_score += b.size;
    }

    return final_score;
}
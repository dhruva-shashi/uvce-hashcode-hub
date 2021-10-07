function evaluate(input, output) {
    var i;
    
    var temp;

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

    return final_score;
}
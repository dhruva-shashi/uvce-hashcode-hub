function evaluate(input, output) {
    var deliveries = parseInt(output[0]);

    var i, j, k, result = 0, n = parseInt(input[0]);

    for (i = 0; i < input.length; i++)
        input[i] = input[i].split(' ');

    for (i = 0; i < output.length; i++)
        output[i] = output[i].split(' ');
        
    var delivered = new Set();

    for (i = 1; i <= deliveries; i++) {
        var pizzas = parseInt(output[i][0]);

        var mm = new Set();

        for (j = 1; j <= pizzas; j++) {
            var pn = parseInt(output[i][j]);
            var ts = parseInt(input[pn+1][0]);

            if (delivered.has(pn) || pn < 0 || pn >= n)
                return 0;

            delivered.add(pn);

            for (k = 1; k <= ts; k++)
                mm.add(input[pn+1][k]);
        }

        result += mm.size*mm.size;
    }

    return result;
}
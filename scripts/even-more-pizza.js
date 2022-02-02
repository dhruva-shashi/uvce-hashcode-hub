function evaluate(input, output) {
    var deliveries = parseInt(output[0]);

    var i, j, k, result = 0;

    for (i = 0; i < input.length; i++)
        input[i] = input[i].split(' ');

    alert(input);

    for (i = 1; i <= deliveries; i++) {
        var temp = output[i].split(' ');

        alert(temp);

        var mm = new Set([]);

        for (j = 1; j <= parseInt(temp[0]); j++) {
            alert(input[parseInt(temp[j]+1)]);
        }

        result += (mm.size*mm.size);
    }

    return result;
}
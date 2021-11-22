function form_init() {
    var problem_name = document.getElementById("text-problem-name");
    var problem_id = document.getElementById("text-problem-id");

    problem_name.addEventListener("change", function() {
        var id = problem_name.value.toLowerCase().replace(' ', '-');
        problem_id.innerHTML = id;
    });
}

function reset() {
    document.getElementById('text-problem-name').value = "";
    document.getElementById('text-problem-id').innerHTML = "";
    document.getElementById('text-number-files').value = "";
    document.getElementById('text-problem-statement').value = "";
    document.getElementById('text-input-format').value = "";
    document.getElementById('text-constraints').value = "";
    document.getElementById('text-output-format').value = "";
    document.getElementById('text-description').value = "";
    document.getElementById('text-scoring').value = "";
    document.getElementById('text-sample-input').value = "";
    document.getElementById('text-sample-output').value = "";
    document.getElementById('text-sample-explanation').value = "";
}

function preview(id, bullets) {
    var modal = document.getElementById("modal");
    var user_text = document.getElementById("text-"+id).value;
    var modal_content = document.getElementById("modal-content");

    if (bullets)
        user_text = '<ul>\n<li>'+user_text.replace(/\n/g, '</li>\n<li>')+'\</li>\n</ul>';
    else
        user_text = '<p>\n'+user_text.replace(/\n/g, '</p>\n<p>')+'</p>';

    modal.style.display = "block";
    modal_content.innerHTML = user_text;

    MathJax.typeset();

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modal_content.innerHTML = "";
        }
    }
}

function down_json() {
    var problem_name = document.getElementById('text-problem-name').value;
    var problem_id = document.getElementById('text-problem-id').innerHTML;
    var date = document.getElementById('text-date').value;
    var description = document.getElementById('text-description').value;
    var number_files = document.getElementById('text-number-files').value;
    var problem_statement = document.getElementById('text-problem-statement').value.split('\n');
    var input_format = document.getElementById('text-input-format').value.split('\n');
    var constraints = document.getElementById('text-constraints').value.split('\n');
    var output_format = document.getElementById('text-output-format').value.split('\n');
    var scoring = document.getElementById('text-scoring').value.split('\n');
    var sample_input = document.getElementById('text-sample-input').value.split('\n');
    var sample_output = document.getElementById('text-sample-output').value.split('\n');
    var sample_explanation = document.getElementById('text-sample-explanation').value.split('\n');

    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    date = date.split('-')

    var year = parseInt(date[0]).toString();
    var month = months[parseInt(date[1])-1];
    var date = parseInt(date[2]).toString();

    var new_date = `${date} ${month} ${year}`

    var json_text = ""

    json_text += '{\n'
    json_text += `\t"id" : "${problem_id}",\n`;
    json_text += `\t"name" : "${problem_name}",\n`;
    json_text += `\t"date" : "${new_date}",\n`;
    json_text += `\t"description" : "${description}",\n`;
    json_text += `\t"number-files" : "${number_files}",\n`;

    json_text += `\t"statement" : [`;
    for (var i = 0; i < problem_statement.length; i++) {
        json_text += `"${problem_statement[i].replace(/\\/g, '\\\\')}"`;
            
        if (i != problem_statement.length-1)
            json_text += ', ';
    }
    json_text += '],\n';

    json_text += `\t"input-format" : [`;
    for (var i = 0; i < input_format.length; i++) {
        json_text += `"${input_format[i].replace(/\\/g, '\\\\')}"`;
           
        if (i != input_format.length-1)
            json_text += ', ';
    }
    json_text += '],\n';

    json_text += `\t"constraints" : [`;
    for (var i = 0; i < constraints.length; i++) {
        json_text += `"${constraints[i].replace(/\\/g, '\\\\')}"`;
            
        if (i != constraints.length-1)
            json_text += ', ';
    }
    json_text += '],\n';

    json_text += `\t"output-format" : [`;
    for (var i = 0; i < output_format.length; i++) {
        json_text += `"${output_format[i].replace(/\\/g, '\\\\')}"`;
            
        if (i != output_format.length-1)
            json_text += ', ';
    }
    json_text += ']\n';

    json_text += `\t"scoring" : [`;
    for (var i = 0; i < scoring.length; i++) {
        json_text += `"${scoring[i].replace(/\\/g, '\\\\')}"`;
            
        if (i != scoring.length-1)
            json_text += ', ';
    }
    json_text += ']\n';

    json_text += `\t"input-sample" : [`;
    for (var i = 0; i < sample_input.length; i++) {
        json_text += `"${sample_input[i].replace(/\\/g, '\\\\')}"`;
            
        if (i != sample_input.length-1)
            json_text += ', ';
    }
    json_text += ']\n';

    json_text += `\t"output-sample" : [`;
    for (var i = 0; i < sample_output.length; i++) {
        json_text += `"${sample_output[i].replace(/\\/g, '\\\\')}"`;
            
        if (i != sample_output.length-1)
            json_text += ', ';
    }
    json_text += ']\n';

    json_text += `\t"scoring-sample" : [`;
    for (var i = 0; i < sample_explanation.length; i++) {
        json_text += `"${sample_explanation[i].replace(/\\/g, '\\\\')}"`;
            
        if (i != sample_explanation.length-1)
            json_text += ', ';
    }
    json_text += ']\n';

    json_text += '}'

    let blob = new Blob([json_text], {type:'text/plain'});
        
    var link = document.getElementById("download-link");
    link.href = URL.createObjectURL(blob);
    link.download = `${problem_id}.json`
    link.click();
}
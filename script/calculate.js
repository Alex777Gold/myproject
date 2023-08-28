$(document).ready( function() {
    $('#calculate_regresion').click(function() {
        let value_x = []
        let data_value_x = $('#datax').val();
        value_x.push(data_value_x);

        let value_y = []
        let data_value_y = $('#datay').val();
        value_y.push(data_value_y);

        value_x = value_x.toString();
        let value_x_array = [];

        value_y = value_y.toString();

        // value_x = value_x.split(",").map(value => value.codePointAt(0) - 96);
        // for (let index = 0; index < value_x.length; index++) {
        //     value_x_array.push(value_x[index].charCodeAt(0));
        // }

        value_x = value_x.split(",").map(value => value.codePointAt(0) - 96);
        console.log(value_x);
        value_y = value_y.split(",").map(value => value.codePointAt(0) - 96);
        console.log(value_y);

        

        let calculate = regression_line(value_x, value_y);
        $('#calculate_result').text("Result: " + calculate);

    });
});

function regression_line(x, y) {
    const n_length = x.length;

    let sum_x = 0;
    let sum_y = 0;
    let sum_x_squared = 0;
    let sum_xy = 0;

    for (let index = 0; index < n_length; index++) {
      sum_x += x[index];
      sum_y += y[index];
      sum_x_squared += x[index] ** 2;
      sum_xy += x[index] * y[index];
    }

    const a_result =
      (sum_x_squared * sum_y - sum_x * sum_xy) /
      (n_length * sum_x_squared - sum_x * sum_x);
    const b_result =
      (n_length * sum_xy - sum_x * sum_y) /
      (n_length * sum_x_squared - sum_x * sum_x);

      console.log(parseFloat(a_result.toFixed(4)) + "," + parseFloat(b_result.toFixed(4)));

    return [
      parseFloat(a_result.toFixed(4)),
      parseFloat(b_result.toFixed(4)),
    ];
    // return parseFloat(a_result.toFixed(4)) + " , " + parseFloat(b_result.toFixed(4));
  }

  let first = [25,30,35,40,45,50];
  let second = [78,70,65,58,48,42];

  console.log(first);
  console.log(second);

  console.log(regression_line(first, second));
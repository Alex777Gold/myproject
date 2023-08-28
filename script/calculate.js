$(document).ready( function() {
    $('#calcuklate_regresion').click(function() {
        let value_x = []
        let data_value_x = $('#datax').val();
        value_x.push(data_value_x);

        let value_y = []
        let data_value_y = $('#datay').val();
        value_y.push(data_value_y);

        let calculate = regression_line(value_x, value_y);
        $('#test_tesult').text("Result: " + value_x + " : " + value_y);
        $('#calculate_result').text("Result: " + calculate);
        console.log(regression_line(value_x, value_y));

    });
});

function regression_line(x, y) {
    let n_length = x.length;

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

    let a_result =
      (sum_x_squared * sum_y - sum_x * sum_xy) /
      (n_length * sum_x_squared - sum_x * sum_x);
    let b_result =
      (n_length * sum_xy - sum_x * sum_y) /
      (n_length * sum_x_squared - sum_x * sum_x);

    return [
      parseFloat(a_result.toFixed(4)),
      parseFloat(b_result.toFixed(4))
    ];
  }

  console.log(regression_line([1,2,3],[1,2,3]));
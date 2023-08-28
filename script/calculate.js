$(document).ready( function() {
    $('#calculate_regresion').click(function() {
      var numberListx = $('#datax').val();
      var numberArrayx = numberListx.split(',').map(function(itemx) {
          return parseInt(itemx);
      });

      console.log(numberArrayx);

      var numberListy = $('#datay').val();
      var numberArrayy = numberListy.split(',').map(function(itemy) {
          return parseInt(itemy);
      });

      console.log(numberArrayy);

      let calculate = regression_line(numberArrayx, numberArrayy);

      console.log(calculate);

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
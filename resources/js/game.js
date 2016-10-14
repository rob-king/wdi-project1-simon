const colors = ['red', 'blue', 'yellow', 'green'];

$(document).ready(function() {
  console.log("jquery working");

  $("body").on("keydown", getKeyCode);

  base = sequence(3);
});

function sequence(n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    elem = colors[Math.floor(Math.random()*colors.length)];
    result.push(elem);
  }
  return _.shuffle(result);
}

function generateRound(base_seq, extend_by) {
  return _.concat(base_seq, sequence(extend_by));
}

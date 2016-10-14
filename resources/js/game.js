const colors = ['red', 'blue', 'yellow', 'green'];
var round = {
  simon:{colors:[]},
  player:{colors:[]}
};

$(document).ready(function() {
  $("body").on("keydown", getKeyCode);
  $("body").on("keydown", getKeyColor);

  round.simon.colors = generateRound(sequence(3),0);
  console.log(round.simon.colors);
  setTimeout(function() {
    console.log(compare(round.player.colors, round.simon.colors));
  }, 30000);
});


function compare(player, simon) {
  return _.difference(player, simon);
}

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

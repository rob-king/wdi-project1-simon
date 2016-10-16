const colors = ['red', 'blue', 'yellow', 'green'];

var round = {
  simon:{sequence:[]},
  player:{sequence:[]},
  winner:"",
  roundNumber: 0,
  checkResult: function() {
    if (compare(this.player.sequence, this.simon.sequence).length === 0) {
      console.log("winner!");
      this.winner = "player";
    } else {
      console.log("You lose");
      this.winner =  "simon";
    }
  },
  startGame: function() {
    this.simon.sequence = generateRound(sequence(3),0);
    this.player.sequence = [];
    this.winner = "";
  },
  nextRound: function() {
    this.simon.sequence = generate(this.simon.sequence, this.roundNumber);
    this.plaer.sequence =  [];
  },
  displaySequence: function () {
    console.log(this.simon.sequence);
  },
  enableInput: function() {
    $("body").on("keydown", getKeyCode);
    $("body").on("keydown", getKeyColor);
  },
  disableInput: function() {
    $("body").off("keydown", getKeyCode);
    $("body").off("keydown", getKeyColor);
  }
};

$(document).ready(function() {
  $("body").on("keydown", getKeyCode);
  $("body").on("keydown", getKeyColor);

  round.startGame();
  round.displaySequence();

  setTimeout(function () {
    round.checkResult();
  }, 15000);

  // round.simon.colors = generateRound(sequence(3),0);
  // console.log(round.simon.colors);
  // setTimeout(function() {
  //   console.log(compare(round.player.colors, round.simon.colors));
  //   round.checkResult();
  // }, 15000);
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

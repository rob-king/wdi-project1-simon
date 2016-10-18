const colors = ['red', 'blue', 'yellow', 'green'];

var round = {
  simon:{sequence:[]},
  player:{sequence:[]},
  winner:"",
  roundNumber: 1,
  checkResult: function() {
    if (compare(this.simon.sequence, this.player.sequence)) {
      console.log("winner!");
      this.winner = "player";
      this.nextRound();
    } else {
      console.log("You lose");
      this.winner =  "simon";
      this.disableInput();
      this.displayLossToggle();
    }
  },
  startGame: function() {
    this.displayReset();
    this.simon.sequence = generateRound(sequence(3),0);
    this.player.sequence = [];
    this.winner = "";
    this.round = 1;
    this.displayRound();
    this.displaySequence();
    this.enableInput();
  },
  nextRound: function() {
    this.disableInput();
    this.roundNumber++;
    this.displayRound();
    this.simon.sequence = generateRound(this.simon.sequence, 1);
    this.player.sequence =  [];
    this.displaySequence();
    this.enableInput();
  },
  displaySequence: function () {
    console.log(this.simon.sequence);
    this.simon.sequence.forEach(function(element, index) {
      setTimeout(function() {
        $(`.${element}`).toggleClass("active");
        setTimeout(function() {
          $(`.${element}`).toggleClass("active");
        }, 60 * index + 50)
      }, 800 * index + 200);
    }
  )},
  displayRound: function() {
    $(".round").text(`Round: ${this.roundNumber}`);
  },
  displayLossToggle: function() {
    $("#game_over").toggleClass("hidden");
  },
  displayReset: function() {
    $("#game_over").addClass("hidden")
    $(".tile").each(function(index,elm) {
      $(elm).removeClass("active");
      console.log(elm)
    });
  },
  enableInput: function() {
    $("body").on("keydown", getKeyCode);
    $("body").on("keydown", getKeyColor);
    $("body").on("keyup", clearColor);

    var that = this;

    var defaultTimeout = setTimeout(function() {
      that.checkResult();
    }, 120000);

    var inputPolling = setInterval(function() {
      if (that.player.sequence.length > 0) {
        if (that.simon.sequence.length === that.player.sequence.length)
        {
          that.checkResult();
          clearTimeout(defaultTimeout);
          clearTimeout(inputPolling);
        }
      }
    }, 100);

  },
  disableInput: function() {
    $("body").off("keydown", getKeyCode);
    $("body").off("keydown", getKeyColor);
    $("body").off("keyup", clearColor);
  }
};

$(document).ready(function() {
  $("#startGame").on("click", round.startGame.bind(round));
});

function compare(simon, player) {
  return _.isEqual(simon, player);
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

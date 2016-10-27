const colors = ['red', 'blue', 'yellow', 'green'];


// I might opt for a constructor function here in place of an object literal declaration.
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
        }, 50 * index + 150)
      }, 800 * index + 100);
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

    // a less costly method would be to call compare whenever you push a user choice to the player sequence, but I'm guessing this might've been a workaround for some issue
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
  // I might opt for referencing a constructor function here, rather than pre-binding your object literal that stored.
});

function compare(simon, player) {
  // haha awesome. I'd consider just writing some of the lodash methods from scratch, just so you aren't dependant on a library, but I think you could and just wanted to write less code
  return _.isEqual(simon, player);
}

// might be slightly more semnatic to call this generateSequence
// nice maintainability feature with taking in an input to generate the initial sequence
function sequence(n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    elem = colors[Math.floor(Math.random()*colors.length)];
    result.push(elem);
  }
  return _.shuffle(result);
}

// It's cool that in theory you could have a difficulty setting that would increase the number of sequential colors by more than (say, 3 at a time) but some might argue this is potentially overengineering--minor note, just food for thought.
function generateRound(base_seq, extend_by) {
  return _.concat(base_seq, sequence(extend_by));
}

// I like the separate file for key controls

const controls = {
    // 1000x yes; very clear
    37: {color:"yellow", key:"left-arrow"},
    38: {color:"blue", key:"up-arrow"},
    39: {color:"red", key:"right-arrow"},
    40: {color:"green", key:"down-arrow"}
  }

// might remove this since it was just for testing/development purposes
function getKeyCode(evt) {
  // do you need preventDefault here? does focus shift due to arrow key presses?
  evt.preventDefault();
  // yeah lodash is cool
  if (_.has(controls, evt.keyCode)) {
    console.log(`${controls[evt.keyCode].key}`);
  }
}

function getKeyColor(evt) {
  // see above
  evt.preventDefault();
  if (_.has(controls, evt.keyCode)) {
    color = controls[evt.keyCode].color;
    round.player.sequence.push(color);
    $(`.${color}`).addClass('active');
    return color;
  }
}

function clearColor(evt) {
  evt.preventDefault();
  if (_.has(controls, evt.keyCode)) {
    // nice use of that data structure
    color = controls[evt.keyCode].color;
    $(`.${color}`).removeClass('active');
  }

}

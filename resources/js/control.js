const controls = {
    37: {color:"yellow", key:"left-arrow"},
    38: {color:"blue", key:"up-arrow"},
    39: {color:"red", key:"right-arrow"},
    40: {color:"green", key:"down-arrow"}
  }

function getKeyCode(evt) {
  evt.preventDefault();
  if (_.has(controls, evt.keyCode)) {
    console.log(`${controls[evt.keyCode].key}`);
  }
}

function getKeyColor(evt) {
  evt.preventDefault();
  if (_.has(controls, evt.keyCode)) {
    color = controls[evt.keyCode].color;
    round.player.colors.push(color);
    return color;
  }
}

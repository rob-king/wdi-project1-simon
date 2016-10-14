function getKeyCode(evt) {
  evt.preventDefault();
  controls = {
    37: {color:"yellow", key:"left-arrow"},
    38: {color:"blue", key:"up-arrow"},
    39: {color:"red", key:"right-arrow"},
    40: {color:"green", key:"down-arrow"}
  }
  console.log(`${controls[evt.keyCode].key}`);
}

var cards = require("../cards.json");

var sets = [];

cards.forEach(function(elem) {
    if (!sets.includes(elem.set)) {
        sets.push(elem.set);
    }
})

sets.forEach(function(elem) {
    console.log(elem);
})

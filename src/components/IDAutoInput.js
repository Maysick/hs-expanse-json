var m = require("mithril")
var Constants = require("../Constants")
var Card = require("../models/Card")

var IDAutoInput = (function (){

    var value = '';

    function oninit(vnode) {
        if (typeof Card.current.tokens !== 'undefined') {
            for (var i = 0; i < Card.current.tokens.length; i++) {
                value += Card.current.tokens[i];
                if (i != Card.current.tokens.length - 1) value += ",";
            }
        }
    }

    function view(vnode) {
        return m("input.input", {
            oninput: function(e) {
                var names = e.target.value.split('\"');
                for (var i = 1; i < names.length; i += 2) {
                    var found = Card.list.find(function (elem) {
                        return elem.name == names[i];
                    });

                    if (typeof found !== 'undefined') {
                        var from = '\"' + names[i] + '\"';
                        e.target.value = e.target.value.replace(from, found.id);
                    }
                }
                var tokens = e.target.value.split(',');
                Card.current.tokens = tokens;
                value = e.target.value;
            },
            value: value,
        })
    }

    return {oninit: oninit, view: view}
})

module.exports = IDAutoInput;
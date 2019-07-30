var m = require("mithril")

var Card = require("../models/Card")

module.exports = (function() {

    var json = '';
    var files;
    var result;

    function load() {
        console.log(files);
        if (files.length <= 0) {
          return false;
        }
        
        var fr = new FileReader();
        
        fr.onload = function(e) { 
          console.log(e);
          result = JSON.parse(e.target.result);
          var formatted = JSON.stringify(result, null, 2);
          Card.parse(result);
        }
        
        fr.readAsText(files.item(0));
      };

    function view(vnode) {
        return m("form[autocomplete=off]", {
            onsubmit: function(e) {
                e.preventDefault();
                load();
                m.route.set("/list");
            }
        }, [
            m("input.input[type=file]", {
                onchange: function (e) {
                    files = e.target.files;
                }
            }),
            m("button.button[type=submit]", "Load"),
        ])
    }

    return {view: view};
})
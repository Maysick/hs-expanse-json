var m = require("mithril")
var Constants = require("../Constants")

var Tooltip = (function (){

    function view(vnode) {
        var class1 = ".tooltip .ttip" + vnode.attrs.direction.toLowerCase();
        var class2 = 'span.tooltiptext ttiptext' + vnode.attrs.direction.toLowerCase();

        return m(class1, ['?', m(class2, vnode.attrs.string)]);
    }

    return {view: view}
})

module.exports = Tooltip;
var m = require("mithril")
var Constants = require("../Constants")

var CardListItem = (function (){

    function view(vnode) {

        return m(m.route.Link, {
            class: "card-list-item",
            href: "/edit/" + vnode.attrs.id,
        }, [
            m('.align-left', vnode.attrs.name),
            m('.align-right', vnode.attrs.id),
            m('div', {style: {clear: 'both'}}),
        ])
    }

    return {view: view}
})

module.exports = CardListItem;
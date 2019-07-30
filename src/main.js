var m = require("mithril")

var CardList = require("./views/CardList")
var CardForm = require("./views/CardForm")
var CardUpload = require("./views/CardUpload")
var Layout = require("./views/Layout")

m.route(document.body, "/list", {
    "/list": {
        render: function () {
            return m(Layout, m(CardList))
        }
    },
    "/edit/:id": {
        render: function(vnode) {
            return m(Layout, m(CardForm, vnode.attrs))
        }
    },
    "/upload/": {
        render: function() {
            return m(Layout, m(CardUpload))
        }
    }
})
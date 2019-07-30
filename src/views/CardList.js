var m = require("mithril")

var Card = require("../models/Card")
var CardListItem = require("../components/CardListItem")
var Utilities = require("../Utilities");

module.exports = {
    //oninit: Card.loadList,
    view : function() {
        return m(".main-page", [
            m(".header", [
                m("button.new", {
                    onclick: function () {
                        m.route.set("/edit/" + Math.round(Math.random() * 100));
                    }
                }, "Add card"),
                m("button.upload", {
                    onclick: function () {
                        m.route.set("/upload/")
                    }
                }, "Load"),
                m("button.download", {
                    onclick: function () {
                        var json = {cards: Card.list};
                        Utilities.downloadObjectAsJson(json, "download");
                    }
                }, "Download"),
                m("button.load", {
                    onclick: function () {
                        Card.loadList();
                    }
                }, "Load Hearthstone JSON"),
            ]),
            m(".card-list", Card.list.map(function(card) {
                return m(CardListItem, {name: card.name, id: card.id});
            })),
        ])
    }
}
var m = require("mithril")
var Card = require("../models/Card")
var Constants = require("../Constants")
var Tooltip = require("../components/Tooltip")
var IDAutoInput = require("../components/IDAutoInput")

module.exports = {
    oninit: function(vnode) {Card.load(vnode.attrs.id)},
    view: function() {
        var isHero = Card.current.type == "HERO";
        var isSpell = Card.current.type == "SPELL";
        var isMinion = Card.current.type == "MINION";
        var isWeapon = Card.current.type == "WEAPON";
        var healthLabel = isHero ? "Armor" : "Health";

        return m("form[autocomplete=off]", {
                onsubmit: function(e) {
                    e.preventDefault();
                    Card.save();
                    m.route.set("/list");
                }
            }, [
            m(".type-container row", [
                m("label.type", "Type"),
                m("select.select", {
                    onchange: function (e) {Card.current.type = e.target.value},
                }, Constants.cardTypes.map(function(e) {return m("option", {
                    value: e,
                    selected: e == Card.current.type ? "selected" : "",
                }, e)})),
                m("label.type", "Class"),
                m("select.select", {
                    onchange: function (e) {Card.current.cardClass = e.target.value},
                }, Constants.cardClasses.map(function(e) {return m("option", {
                    value: e,
                    selected: e == Card.current.cardClass ? "selected" : "",
                }, e)})),
                m("label.type", "Rarity"),
                m("select.select", {
                    onchange: function (e) {Card.current.rarity = e.target.value},
                }, Constants.cardRarities.map(function(e) {return m("option", {
                    value: e,
                    selected: e == Card.current.rarity ? "selected" : "",
                }, e)})),
                m(Tooltip, {string: "For custom sets, use CUSTOM1.", direction: Constants.tooltipDir.DOWN}),
                m("label.type", "Set"),
                m("input.datalist[type=text][list=set]", {
                    onchange: function (e) {Card.current.set = e.target.value},
                    value: Card.current.set,
                }, [
                    m("datalist.select[id=set]", Constants.cardSets.map(function(e) {return m("option", {
                        value: e,
                    }, e)})),
                ]),
            ]),
            m(".name-container row", [
                m(".name-couple couple", [
                    m("label.label", "Name"),
                    m("input.input[type=text][placeholder=Card name]", {
                        oninput: function (e) {Card.current.name = e.target.value},
                        value: Card.current.name
                    }),
                ]),
                m(".tribe-couple couple", [
                    m("label.label", "Tribe"),
                    m("input.input[type=text]", {
                        oninput: function (e) {Card.current.race = e.target.value},
                        value: Card.current.race
                    }),
                ]),
            ]),
            m(".stats-container row", [
                m("label.stats", "Mana"),
                m("input.input[type=number][placeholder=0]", {
                    oninput: function (e) {Card.current.cost = e.target.value},
                    value: Card.current.cost
                }),
                m("label.stats", "Attack"),
                m("input.input[type=number][placeholder=0]", {
                    oninput: function (e) {Card.current.attack = e.target.value},
                    value: Card.current.attack,
                    disabled: isSpell || isHero,
                }),
                m("label.stats", healthLabel),
                m("input.input[type=number][placeholder=0]", {
                    oninput: function (e) {
                        if (!isHero) Card.current.health = e.target.value;
                        else Card.current.armor = e.target.value;
                    },
                    value: isHero ? Card.current.armor : Card.current.health,
                    disabled: isSpell,
                }),
            ]),
            m(".text-container row", [
                m(".text-couple couple", [
                    m("label.label", "Text"),
                    m("textarea.text[rows=5][cols=45]", {
                        oninput: function (e) {Card.current.text = e.target.value},
                        value: Card.current.text
                    }),
                ]),
                m(".flavor-couple couple", [
                    m("label.label", "Flavor"),
                    m("textarea.flavor[rows=5][cols=45]", {
                        oninput: function (e) {Card.current.flavor = e.target.value},
                        value: Card.current.flavor
                    }),
                ]),
            ]),
            m(".token-container row", [
                m("label.label", [
                    "Tokens",
                    m(Tooltip, {string: "Enter token cards by ID, comma seperated. Use quotation marks to auto-search for cards.", direction: Constants.tooltipDir.RIGHT}),
                ]),
                m(IDAutoInput),
            ]),
            m(".art-container row", [
                m(".artist-couple couple", [
                    m("label.label", "Artist"),
                    m("input.input[type=text]", {
                        oninput: function (e) {Card.current.artist = e.target.value},
                        value: Card.current.artist
                    }),
                ]),
                m(".source-couple couple", [
                    m("label.label", "Art Source"),
                    m("input.input[type=text]", {
                        oninput: function (e) {Card.current.source = e.target.value},
                        value: Card.current.source
                    }),
                ]),
            ]),
            m(".button-container row", [
                m("button.button[type=submit]", "Save"),
                m("button.delete[type=button]",{
                    onclick: function () {
                        Card.delete();
                        m.route.set("/list");
                    }
                },"Delete"),
            ]),
            //artist, source
            
        ])
    }
}
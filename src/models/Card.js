var m = require("mithril")

var Card = {
    list: [],
    loadList: function() {
        return m.request({
            method: "GET",
            url: "https://api.hearthstonejson.com/v1/31761/enUS/cards.collectible.json",
        })
        .then(function(result) {
            Card.list = result;
        })
    },

    current: {},
    load: function (id) {
        this.current = this.list.find(function(elem) {
            return elem.id == id;
        });

        if (typeof this.current == "undefined") {
            this.current = getBlankCard();
            this.current.id = id;
        }
    },

    // Updates or add this.current into this.list
    save: function () {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id == this.current.id) {
                this.list[i] = this.current;
                return;
            }
        }

        this.list.push(this.current);
    },

    // Removes this.current from this.list
    delete: function () {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id == this.current.id) {
                this.list.splice(i, 1);
                return;
            }
        }
    },

    // Load in list from an uploaded file
    parse: function(file) {
        this.list = file.cards;
    }

}

function getBlankCard() {
    return {
        "artist":"",
        "cardClass":"MAGE",
        "collectible":true,
        "cost":0,
        "flavor":"",
        "id":"",
        "name":"Card Name",
        "rarity":"COMMON",
        "set":"",
        "text":"",
        "type":"SPELL"
    }
}



module.exports = Card;
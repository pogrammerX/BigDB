const fs = require("fs")

module.exports = class BigDB {
    pairs = []

    add(key, value) {
        this.pairs.push(key + "__equalsTo__=" + value);
    }

    get(key) {
        for (const pair of this.pairs) {
            if(pair.split("__equalsTo__=")[0] == key)
                return pair.split("__equalsTo__=")[1];
        }

        return null;
    }

    remove(key) {
        let index = 0;
        for (const pair of this.pairs) {
            if(pair.split("__equalsTo__=")[0] == key)
            {
                this.pairs.splice(index, 1);
            }

            index += 1;
        }
    }

    set(key, value) {
        this.remove(key);
        this.add(key, value);
    }

    printContents() {
        for (const pair of this.pairs) {
            console.log("Key: " + pair.split("__equalsTo__=")[0] + "\nValue: " + pair.split("__equalsTo__=")[1] + "\n---------")
        }
    }

    loadDB(filename) {
        this.pairs = fs.readFileSync(filename).toString().split('\n');
    }

    saveDB(filename) {
        fs.writeFileSync(filename, this.pairs.join("\n"));
    }
}
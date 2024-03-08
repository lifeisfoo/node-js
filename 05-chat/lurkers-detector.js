const EventEmitter = require("events");

class LurkersDetector extends EventEmitter {
    constructor(tSec) {
        super();
        this.users = {};
        this.timeoutMS = tSec * 1000;
    }
    addUser(name) {
        this.users[name] = setTimeout(() => {
            this.emit("lurker detected", name);
        }, this.timeoutMS);
    }
    touchUser(name) {
        clearTimeout(this.users[name]);
        this.addUser(name);
    }
    renameUser(oldName, newName) {
        this.removeUser(oldName);
        this.addUser(newName);
    }
    removeUser(name) {
        clearTimeout(this.users[name]);
        delete this.users[name];
    }
}

module.exports = LurkersDetector;

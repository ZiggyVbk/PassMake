"use strict";
var keymaker = (function () {
    function keymaker(progresselement, codeoutputelement, codelist, keylengthcount, storagelimit, timerms, debugon) {
        if (keylengthcount === void 0) { keylengthcount = 12; }
        if (storagelimit === void 0) { storagelimit = 4; }
        if (timerms === void 0) { timerms = 1000; }
        if (debugon === void 0) { debugon = false; }
        this.storagelimit = 4;
        this.progressval = 100;
        this.keyarray = [];
        this.keysgenerated = 0;
        this.progressbar = progresselement;
        this.codeoutput = codeoutputelement;
        this.keylist = codelist;
        this.keylength = keylengthcount;
        this.storagelimit = storagelimit;
        this.timeoutms = timerms;
        this.debugstatus = debugon;
    }
    keymaker.prototype.genCharArray = function (charA, charZ) {
        var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (; i <= j; ++i) {
            a.push(String.fromCharCode(i));
        }
        return a;
    };
    keymaker.prototype.genNumberArray = function (zero, nine) {
        if (zero === void 0) { zero = 0; }
        if (nine === void 0) { nine = 9; }
        var b = [], i = zero;
        for (; i <= nine; ++i) {
            b.push(i);
        }
        return b;
    };
    keymaker.prototype.genSpecialArray = function (underscore, atChar, hashChar) {
        if (underscore === void 0) { underscore = true; }
        if (atChar === void 0) { atChar = true; }
        if (hashChar === void 0) { hashChar = true; }
        var c = [];
        if (underscore) {
            c.push("_");
        }
        if (atChar) {
            c.push("@");
        }
        if (hashChar) {
            c.push("#");
        }
        return c;
    };
    keymaker.prototype.keyArrayHandler = function (passcode, storagelimit, debug) {
        if (storagelimit === void 0) { storagelimit = 4; }
        if (debug === void 0) { debug = false; }
        if (this.keyarray.length >= storagelimit) {
            this.keyarray.shift();
            this.keyarray.push(passcode);
        }
        else {
            this.keyarray.push(passcode);
        }
        this.keylist.innerHTML = "";
        for (var i = 0; i < this.keyarray.length; i++) {
            this.keylist.innerHTML += "<li>" + this.keyarray[i] + "</li>";
        }
        if (debug || this.debugstatus)
            console.log(this.keyarray);
    };
    keymaker.prototype.progressBar = function (cutby, procinbar, debug) {
        if (cutby === void 0) { cutby = 20; }
        if (procinbar === void 0) { procinbar = false; }
        if (debug === void 0) { debug = false; }
        this.progressval = this.progressval - cutby;
        if (this.progressval == 0) {
            this.codeoutput.innerHTML = this.generateNewKey(this.keylength, true, this.debugstatus);
            this.progressval = 100;
        }
        if (procinbar)
            this.progressbar.innerHTML = String(this.progressval) + "%";
        if (debug || this.debugstatus)
            console.log("progress: " + this.progressval + "%");
        this.progressbar.style.width = String(this.progressval) + "%";
    };
    keymaker.prototype.startGeneratingKeys = function () {
        var _this = this;
        if (this.keysgenerated == 0)
            this.codeoutput.innerHTML = this.generateNewKey(this.keylength, true, this.debugstatus);
        this.generatetimer = setInterval(function () { return _this.progressBar(5); }, this.timeoutms);
    };
    keymaker.prototype.stopGeneratingKeys = function () {
        clearInterval(this.generatetimer);
    };
    keymaker.prototype.generateNewKey = function (keylength, insertkeyarray, debug) {
        if (keylength === void 0) { keylength = 12; }
        if (insertkeyarray === void 0) { insertkeyarray = true; }
        if (debug === void 0) { debug = false; }
        var under = this.genCharArray('a', 'z'), upper = this.genCharArray('A', 'Z'), number = this.genNumberArray(), special = this.genSpecialArray(), msg = "", a = 0, i = 0, c = [under, upper, number, special];
        for (i = 0; i < keylength; ++i) {
            if (Math.floor(Math.random() * 100) > 35) {
                a = Math.floor(Math.random() * (c.length - 1));
            }
            else {
                a = Math.floor(Math.random() * c.length);
            }
            msg += c[a][Math.floor(Math.random() * c[a].length)];
        }
        if (insertkeyarray)
            this.keyArrayHandler(msg, this.storagelimit);
        this.keysgenerated++;
        if (debug || this.debugstatus)
            console.log("key: " + msg, "- keynr: " + this.keysgenerated);
        return msg;
    };
    return keymaker;
}());
window.onload = function () {
    var progress = document.getElementById("progbarstatus"), output = document.getElementById("keycode"), keylist = document.getElementById("keycodelist");
    var passwordgen = new keymaker(progress, output, keylist, 16, 6, 500, true);
    passwordgen.startGeneratingKeys();
};

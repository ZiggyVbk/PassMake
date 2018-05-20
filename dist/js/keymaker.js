"use strict";
var keymaker = /** @class */ (function () {
    function keymaker(progresselementname, codeoutputname, keylengthcount, debugon) {
        if (keylengthcount === void 0) { keylengthcount = 12; }
        if (debugon === void 0) { debugon = false; }
        this.keylength = keylengthcount;
        this.debugstatus = debugon;
        this.progressbar = progresselementname;
        this.codeoutput = codeoutputname;
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
    keymaker.prototype.progressBar = function () {
        var progressval = Number(this.progressbar.value);
        if (progressval == 0) {
            progressval = 100;
            this.codeoutput.innerHTML = this.generateNewKey(this.keylength, this.debugstatus);
        }
        else {
            progressval = progressval - 25;
        }
        this.progressbar.value = String(progressval);
    };
    keymaker.prototype.generateNewKey = function (keylength, debug) {
        if (keylength === void 0) { keylength = 12; }
        if (debug === void 0) { debug = false; }
        var under = this.genCharArray('a', 'z'), upper = this.genCharArray('A', 'Z'), number = this.genNumberArray(), msg = "", a = 0, i = 0, c = [under, upper, number];
        for (i = 0; i < keylength; ++i) {
            a = Math.floor(Math.random() * c.length);
            msg += c[a][Math.floor(Math.random() * c[a].length)];
        }
        if (debug || this.debugstatus)
            console.log(msg);
        return msg;
    };
    return keymaker;
}());
window.onload = function () {
    var progress = document.getElementById("progbar"), output = document.getElementById("keycode");
    var passwordgen = new keymaker(progress, output);
    window.setInterval(function () {
        passwordgen.progressBar();
    }, 1000);
    output.innerHTML = passwordgen.generateNewKey();
};

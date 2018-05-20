class keymaker {
    
    private keylength : number;

    private progressbar : HTMLInputElement;
    private codeoutput : HTMLElement;

    private debugstatus : boolean;

    constructor(progresselementname : HTMLInputElement, codeoutputname : HTMLElement, keylengthcount : number = 12, debugon : boolean = false) {
        this.keylength = keylengthcount;

        this.debugstatus = debugon;

        this.progressbar = progresselementname;
        this.codeoutput = codeoutputname;
    }

    private genCharArray(charA : string, charZ : string) {
        let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (; i <= j; ++i) {
            a.push(String.fromCharCode(i));
        }
        return a;
    }
    private genNumberArray(zero : number = 0, nine : number = 9) {
        let b = [], i = zero;
        for(; i <= nine; ++i)
        {
            b.push(i);
        }
        return b;
    }

    public progressBar() {
        let progressval = Number(this.progressbar.value);	
        if(progressval == 0)
        {
            progressval = 100;
            this.codeoutput.innerHTML = this.generateNewKey(this.keylength, this.debugstatus);
        }else{
            progressval = progressval - 25;
        }
        this.progressbar.value = String(progressval);
    }
    
    public generateNewKey(keylength : number = 12, debug : boolean = false) {
        let under = this.genCharArray('a', 'z'), upper = this.genCharArray('A', 'Z'), number = this.genNumberArray(), msg = "", a = 0, i = 0, c = [under, upper, number];
        for(i = 0; i < keylength; ++i)
        {
            a = Math.floor(Math.random() * c.length);
            msg += c[a][Math.floor(Math.random() * c[a].length)];
        }
        if(debug || this.debugstatus) console.log(msg);
        return msg;
    }
}

window.onload = () => {
    const   progress = <HTMLInputElement> document.getElementById("progbar"),
            output = <HTMLElement> document.getElementById("keycode");
    let     passwordgen = new keymaker(progress, output);
    
    window.setInterval(function() {
        passwordgen.progressBar();   
    }, 1000)
    output.innerHTML = passwordgen.generateNewKey(); 
};
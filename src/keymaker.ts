class keymaker {
    
    private keylength : number;

    private progressbar : HTMLInputElement;
    private codeoutput : HTMLElement;
    private keylist : HTMLElement;

    private keyarray : Array<string> = [];
    private keysgenerated : number = 0;

    private generatetimer : any;
    private timeoutms : number;

    private debugstatus : boolean;

    constructor(progresselement : HTMLInputElement, codeoutputelement : HTMLElement, codelist : HTMLElement, keylengthcount : number = 12, timerms : number = 1000, debugon : boolean = false) {
        
        this.progressbar = progresselement;
        this.codeoutput = codeoutputelement;
        this.keylist = codelist;

        this.keylength = keylengthcount;
        
        this.timeoutms = timerms;

        this.debugstatus = debugon;
    }

    //Creates an ABC array
    private genCharArray(charA : string, charZ : string) {
        let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (; i <= j; ++i) {
            a.push(String.fromCharCode(i));
        }
        return a;
    }

    //Creates a 0-9 array
    private genNumberArray(zero : number = 0, nine : number = 9) {
        let b = [], i = zero;
        for(; i <= nine; ++i)
        {
            b.push(i);
        }
        return b;
    }

    //Removes the first by 4 passwords generated, pushing a new one in after OR just adds a new password
    private keyArrayHandler(passcode : string, storagelimit : number = 4, debug : boolean = false)
    {
        if(this.keyarray.length >= storagelimit)
        {
            this.keyarray.shift();
            this.keyarray.push(passcode);
        }else{
            this.keyarray.push(passcode);
        }

        this.keylist.innerHTML = "";
        for(let i = 0; i < this.keyarray.length; i++)
        {
            this.keylist.innerHTML += this.keyarray[i] + "<br/>";
        }

        if(debug || this.debugstatus) console.log(this.keyarray);
    }

    //Slices progress or resets it with a new code
    private progressBar(debug : boolean = false) {
        let progressval = Number(this.progressbar.value);	
        
        progressval = progressval - 25;
        
        if(progressval == 0){
            this.codeoutput.innerHTML = this.generateNewKey(this.keylength, true, this.debugstatus); 
            
            progressval = 100; 
        }
        
        if(debug || this.debugstatus) console.log("progress: " + progressval);
        this.progressbar.value = String(progressval);
    }

    //Start the timer on the progressbar and let it more generate keys
    public startGeneratingKeys()
    {
        if(this.keysgenerated == 0) this.codeoutput.innerHTML = this.generateNewKey(this.keylength, true, this.debugstatus);
        this.generatetimer = setInterval(() => this.progressBar(), this.timeoutms);
    }

    //Stops the (timer/) whole generating business
    public stopGeneratingKeys() {
        clearInterval(this.generatetimer);
    }
    
    //Generates a new key (directly!)
    public generateNewKey(keylength : number = 12, insertkeyarray : boolean = true, debug : boolean = false) {
        let under = this.genCharArray('a', 'z'), upper = this.genCharArray('A', 'Z'), number = this.genNumberArray(), msg = "", a = 0, i = 0, c = [under, upper, number];

        for(i = 0; i < keylength; ++i)
        {
            a = Math.floor(Math.random() * c.length);
            msg += c[a][Math.floor(Math.random() * c[a].length)];
        }
        
        if(insertkeyarray) this.keyArrayHandler(msg);
        this.keysgenerated++;

        if(debug || this.debugstatus) console.log("key: " + msg, "- keynr: " + this.keysgenerated);
        return msg;
    }
}

//Running the code:
window.onload = () => {
    const   progress = <HTMLInputElement> document.getElementById("progbar"),
            output = <HTMLElement> document.getElementById("keycode"),
            keylist = <HTMLElement> document.getElementById("keycodelist");
    
    //Creates it
    //let     passwordgen = new keymaker(progress, output, keylist, 12, 1000, true);
    let     passwordgen = new keymaker(progress, output, keylist, 16, 2000);
    
    //Starts it
    passwordgen.startGeneratingKeys();

    //You can just generate one key
    //output.innerHTML = passwordgen.generateNewKey(16, false); 
};
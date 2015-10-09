module.exports = require("lib.Controller").extend("BaseKeyboardController", {

  init: function(options, cb){
    document.body.addEventListener("keydown",   this.handleKeyboardEvent.bind(this, "keydown"  ));
    document.body.addEventListener("keyup",     this.handleKeyboardEvent.bind(this, "keyup"    ));
    document.body.addEventListener("keypress",  this.handleKeyboardEvent.bind(this, "keypress" ));
    this.trigger("init");
    cb();
  },

  specialKeys: {
    16: "shift",
    17: "ctrl",
    18: "alt"
  },

  mods: {
    ctrl:  false,
    alt:   false,
    shift: false,
  },

  getMods: function(){
    return [
      this.mods["ctrl"]  ? "ctrl:"   : "",
      this.mods["alt"]   ? "alt:"    : "",
      this.mods["shift"] ? "shift:"  : "",
    ].join("");
  },

  setMod: function(type, key){
    if(type === "keydown")    this.mods[key] = true;
    else if(type === "keyup") this.mods[key] = false;
  },

  handleKeyboardEvent: function(type, event){
    var key, mods, char;
    if(this.specialKeys[event.keyCode]) {
      this.setMod(type, this.specialKeys[event.keyCode]);
      mods = this.getMods(true);
      key = mods.replace(/:$/, "");
    }
    else{
      char = String.fromCharCode(event.keyCode);
      mods = this.getMods();
      key  = char.toLowerCase();
      key  = mods? (mods+key) : key;
    }
    event.preventDefault();
    this.trigger(type+":"+key);
    this.trigger("key", this.mods.shif ? char.toUpperCase() : char.toLowerCase() );
  }
})

(function(){

  function stop(spinner, fn){
    if (fn) fn.call(spinner);
    xtag.transition(spinner, 'fade-out', {
      after: function(){ spinner.spinning = false; }
    });
  }

  xtag.register('x-spinner', {
    accessors: {
      fade: {
        attribute: { boolean: true }
      },
      reverse: {
        attribute: { boolean: true }
      },
      spinning: {
        attribute: { boolean: true },
        set: function(value, old){
          if (value != old) value ? this.spin() : this.stop();
        }
      },
      duration: {
        attribute: {}
      },
      minDuration: {
        attribute: {}
      }
    },
    methods: {
      spin: function(fn){
        this.spinning = true;
        clearTimeout(this.xtag.stop);
        this.xtag.start = new Date().getTime();
        xtag.transition(this, 'fade-in', fn ? { after: fn.bind(this) } : null);
        if (this.duration) this.xtag.stop = setTimeout(this.stop.bind(this), this.duration);
      },
      stop: function(fn){
        if (this.minDuration) {
          clearTimeout(this.xtag.stop);
          this.xtag.stop = setTimeout(
            stop.bind(null, this, fn),
            this.minDuration - (new Date().getTime() - this.xtag.start)
          );
        }
        else stop(this, fn);
      },
      toggle: function(fn){
        this.spinning ? this.stop(fn) : this.spin(fn);
      }
    }
  });

})();

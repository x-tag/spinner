(function(){

  xtag.register('x-spinner', {
    content: '<div class="x-spinner-center"><svg viewBox="0 0 170 170">' +
                '<path fill="none" stroke="inherit" stroke-width="25" stroke-linecap="round" stroke-miterlimit="10" d="M84.5,156.5 c-39.8,0-72-32.2-72-72"/>' +
                '<path fill="none" stroke="inherit" stroke-width="25" stroke-linecap="round" stroke-miterlimit="10" d="M84.5,12.5 c39.8,0,72,32.2,72,72"/>' +
             '</svg></div>',
    lifecycle: {
      created: function() {
        this.xtag.center = this.lastElementChild;
        this.xtag.svg = this.lastElementChild.firstElementChild;
      }
    },
    accessors: {
      fade: {
        attribute: { boolean: true }
      },
      reverse: {
        attribute: { boolean: true }
      },
      src: {
        attribute: { property: 'svg' }
      },
      label: {
        attribute: { property: 'center' }
      },
      spinning: {
        attribute: { boolean: true },
        set: function(value, old){
          if (value != old) value ? this.spin() : this.stop();
        }
      },
      duration: {
        attribute: {},
        set: function(value){
          this.xtag.svg.style.animationDuration = this.xtag.svg.style[xtag.prefix.lowercase + 'AnimationDuration'] = value;
        }
      }
    },
    methods: {
      spin: function(){
        this.spinning = true;
        if (this.fade) xtag.transition(this, 'fade-in');
      },
      stop: function(){
        if (this.fade) xtag.transition(this, 'fade-out', {
          after: function(){ this.spinning = false; }
        });
        else this.spinning = false;
      },
      toggle: function(){
        this.spinning ? this.stop() : this.spin();
      }
    }
  });

})();

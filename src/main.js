(function(){
   
  var frag = xtag.createFragment('<div class="x-spinner-center"><img class="x-spin-element" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" /></div>');
  
  xtag.register('x-spinner', {
    lifecycle: {
      created: function() {
        this.appendChild(frag.cloneNode(true));
        this.xtag.center = this.lastElementChild;
        this.xtag.img = this.lastElementChild.firstElementChild;
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
        attribute: { property: 'img' }
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
          this.xtag.img.style.animationDuration = this.xtag.img.style[xtag.prefix.lowercase + 'AnimationDuration'] = value;
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

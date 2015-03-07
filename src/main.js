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
    events: {
      transitionend: function(e){
        if (e.propertyName == 'opacity' && !this.hasAttribute('spinning')) {
          this.removeAttribute('x-spinner-spinning');
        }
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
        set: function(value){
          if (value) this.spin();
          else this.stop();
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
        if (!this.hasAttribute('spinning')) this.spinning = true;
        this.setAttribute('x-spinner-spinning', '');
      },
      stop: function(){
        if (this.hasAttribute('spinning')) this.spinning = false; 
        if (!this.fade) this.removeAttribute('x-spinner-spinning');
      },
      toggle: function(){
        this[this.spinning ? 'stop' : 'spin']();
      }
    }
  });

})();

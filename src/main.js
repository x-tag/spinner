(function(){
  
  var img = document.createElement('img');
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  
  xtag.register('x-spinner', {
    lifecycle: {
      created: function() {
        this.xtag.img = this.appendChild(img.cloneNode(true));
      }
    },
    events: {
      transitionend: function(e){
        if (e.target == this.xtag.img && e.propertyName == 'opacity' && !this.hasAttribute('spinning')) {
          this.removeAttribute('x-spinner-spinning');
        }
      }
    },
    accessors: {
      fade: {
        attribute: { boolean: true }
      },
      spinning: {
        attribute: { boolean: true }
      }
    }, 
    methods: {
      spin: function(duration){
        this.spinning = true;
        this.setAttribute('x-spinner-spinning', '');
        clearTimeout(this.xtag.spinTimer);
        if (duration) this.xtag.spinTimer = setTimeout(this.stop, duration);
      },
      stop: function(){
        clearTimeout(this.xtag.spinTimer);
        if (!this.fade) this.removeAttribute('x-spinner-spinning');
        this.spinning = false; 
      },
      toggle: function(duration){
        this[this.spinning ? 'stop' : 'spin'](duration);
      }
    }
  });

})();

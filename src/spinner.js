(function(){

  function updateSize(el) {
    var oWidth = el.offsetWidth;
    el.xtag.img.style.borderWidth = oWidth * .1 + 'px';
    el.xtag.textEl.style.lineHeight = oWidth + 'px';
    el.style.fontSize = oWidth + 'px';
  }

  var emptyGif = 'data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

  xtag.register('x-spinner', {
    lifecycle: {
      created: function(){
        this.xtag.textEl = document.createElement('b');
        this.xtag.img = document.createElement('img');
        this.xtag.img.src = emptyGif;
        this.appendChild(this.xtag.textEl);
        this.appendChild(this.xtag.img);
        updateSize(this);
      },
      inserted: function() {
        updateSize(this);
      }
    },
    accessors: {
      label: {
        attribute: {},
        set: function(text) {
          this.xtag.textEl.innerHTML = text;
        }
      },
      duration: {
        attribute: {},
        set: function(duration) {
          this.xtag.img.style.animationDuration = (+duration || 1) + 's';
        }
      },
      reverse: {
        attribute: {
          boolean: true
        },
        set: function(val) {
          this.xtag.img.style.animationDirection = val ? 'reverse' : 'normal';
        }
      },
      src: {
        attribute: {
          property: 'img'
        },
        set: function(src) {
          if (!src) {
            this.xtag.img.src = emptyGif;
          }
        }
      }
    }
  });

})();
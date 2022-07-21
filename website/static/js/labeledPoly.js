LabeledRect = fabric.util.createClass(fabric.Rect, {

    type: 'labeledRect',
    initialize: function(options) {
      options || (options = { });
  
      this.callSuper('initialize', options);
      this.set('label', options.label || '');
    },
  
    toObject: function() {
      return fabric.util.object.extend(this.callSuper('toObject'), {
        label: this.get('label')
      });
    },
  
    _render: function(ctx) {
      this.callSuper('_render', ctx);
      var font_size = Math.ceil((this.height + this.width) / 20);
      ctx.font = '500 ' + font_size.toString() + 'px Share Tech Mono';
      ctx.fillStyle = 'rgb(0, 255, 213)';
      ctx.fillText(this.label, -this.width/2 + 5, -this.height/2 + font_size-2);
    }
  });

  function name_selection() {
    var sel_name = prompt("Name selection");
    return sel_name;
  }
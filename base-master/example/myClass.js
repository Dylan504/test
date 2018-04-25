define(function(require, exports, module){
    var $ = require('jquery');
    var Base = require('../src/base');
    var MyClass = Base.extend({
        attrs: {
            element: $('input#name'),
            name: {
                value: '',
                setter: function(val) {
                    return val || ''
                },
                getter: function(val) {
                    return val + ''
                }
            }
        },
        propsInAttrs: ['element'],
        initialize: function(options) {
            MyClass.superclass.initialize.call(this, options); 
            
            var that = this;
            
            this._async = function() {
                that.set('name', that.element.val(), {
                    silent: true
                });
            };
            
            this.element.on('change', this._async);
        },
        say: function() {
            alert(this.get('name'));
        },
        destroy: function() {
            this.element.off('change', this._async);
            
            MyClass.superclass.destroy.call(this);
        },        
        
        _onChangeName: function(val) {
            this.element.val(val);
        }
    });
    
    // use MyClass like:
    my = new MyClass();
    
    my.before('say', function() {
        if (!this.get('name')) return false; 
    });
    
    my.set('name', 'arale');
    
    setTimeout(function() {
        my.element.val('change name with aralejs');
        my.element.change();
        my.say();
        
        
        my.element.val('');
        my.element.change();
        my.say();
        
        my.destroy();
    }, 3000);
})
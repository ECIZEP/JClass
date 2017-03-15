/*!
  * JClass
  * https://github.com/ecizep/JClass
  *
  */

+function(context, fn) {
    context['JClass'] = fn();
}(this, function() {

    function JClass(constructor, superConstructor){
        
        constructor = isFunction(constructor) ? constructor : function(){};

        function isFunction(func){
            return typeof func === 'function';
        }

        function shadowCopy(sourse, target){
            // is this sourse a JConstructor ? 
            var isJConstructor = target.hasOwnProperty('proto');

            for(var key in sourse){
                if(sourse.hasOwnProperty(key)){
                    // not allowed to add name and length
                    if(isJConstructor && (key === 'name' || key === 'length')){
                        throw new Error("the property's name of Constructor cannot be 'name' or 'length'");
                    }else{
                        target[key] = sourse[key]
                    }
                }
            }
        }

        function JConstructor(){
            // superClass Constructor invocation 
            isFunction(superConstructor) ? superConstructor.apply(this,arguments) : {};
            // self
            constructor.apply(this, arguments);
        }

        // static: property of constructor
        JConstructor.static =  function(obj){
            if(typeof obj === 'object'){
                shadowCopy(obj, this);
            }
            return this;
        }

        JConstructor.proto = function(obj) {
            if(typeof obj === 'object'){
                shadowCopy(obj, this.prototype);
            }
            return this;
        }

        // to overwrite prototype's methods or mixin an instance method
        JConstructor.prototype.instance = function(obj){
            // make sure that this refer to an instance of JConstructor
            // rather than refer to prototype
            if(this instanceof JConstructor && !this.hasOwnProperty('constructor')){
                shadowCopy(obj, this);
            }
            return this;
        }

        JConstructor.extend = function(constructor){
            constructor = isFunction(constructor) ? constructor : function(){};
            // create subclass
            var subType = JClass(constructor, this);
            // extend
            subType.prototype = Object.create(this.prototype);
            // fix the constructor pointer
            subType.prototype.constructor = subType;
            return subType;
        }

        return JConstructor;
    }
    
    return JClass;
});

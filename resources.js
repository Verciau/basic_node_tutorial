"use strict";
/* jshint devel:true */

class Resource {
    constructor() {
        if (this.constructor === Resource){
            throw new TypeError('Abstract class "Resource" cannot be instantiated directly.');
        }

        if (this.schema === undefined) {
            throw new TypeError('Classes extending the widget abstract class');
        }
    }
}

class BearNameRes extends Resource{
    constructor(){
        super();
    }
    get name(){
        return {
            "name" : Math.random().toString(36).substring(2)
        };
    }
}

console.log(BearNameRes.name);
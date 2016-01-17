import {Component} from 'angular2/core';

interface Hero {
    id   : number;
    name : string;
}

@Component({
    selector    : 'my-app',
    templateUrl : 'templates/home.html'
})
export class AppComponent {
    public title      = 'Leon Angular 2';
    public hero: Hero = {
        id   : 1,
        name : 'Leon'
    };
    todoModel = 'My model';
    name: string;
    constructor() {
        this.name = 'Alice';
    }
    doSomething() {
        alert('Clicked!');
    }
}

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

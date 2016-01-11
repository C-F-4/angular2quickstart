import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: '<h1>My title: {{title}}</h1> <h2>Hardcoded h2</h2>'
})
export class AppComponent {
    title = "My First Angular 2 App";
}
System.config({
    transpiler: 'typescript', 
    typescriptOptions: { emitDecoratorMetadata: true }, 
    packages: {'app': {defaultExtension: 'ts'}} 
  });
  System.import('app/boot')
        .then(null, console.error.bind(console));

var FirstComponent = ng.
    Component({
        selector: 'first-comp'  
    })
    .View({
        template: '<h2>I am learning {{ myFramework }}</h2>'
    })
    .Class({
        constructor: function() {
            this.myFramework = "Angular2";
        }
    });

document.addEventListener('DOMContentLoaded', function() {
    ng.bootstrap(firstComponent);
});
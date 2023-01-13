import { Component } from '@angular/core';

// The '@Component' is a decorator used to specify the metadata for the component 
// class defined immediately below it.
@Component({
    'selector': 'app-server', 
    // app-server now is the name of the component (used as <app-server></app-server>) 
    // that will be used to call the component in other components for rendering purposes,
    // not one used defining the actual class component 'export class ServerComponent'
    'templateUrl': './server.component.html'
})

// Actual angular component class definition - a component is a TS class in angular 
export class ServerComponent {

}

// A Decorator is a special kind of declaration that can be attached to a class declaration,
//  method, accessor, property, or parameter. Decorators use the form @expression , where 
//  expression must evaluate to a function that will be called at runtime with information 
//  about the decorated declaration.

// Decorators are functions that are invoked with a prefixed @ symbol, and are immediately
// followed by a class, method or property / placed above a class, method or property.

// Basically, a decorator provides configuration metadata that determines how the component, class or a function should
//  be processed, instantiated and used at runtime. 
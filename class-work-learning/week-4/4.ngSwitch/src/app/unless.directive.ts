import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
// unless IS A SETTER FUNCTION  - setter name should be same name as directive selector
@Input() set appUnless(condition: boolean) {
  if(!condition){
    // ADD ELEMENT ON DOM
    this.vcRef.createEmbeddedView(this.templateRef)
  }
  else {
    // THIS REMOVE THIS(WHERE DIRECTIVE IS PLACED) ELEMENT FROM DOM
    this.vcRef.clear()
  }
}
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }
 //  vcRef - is view container where element will be displayed in the template

}

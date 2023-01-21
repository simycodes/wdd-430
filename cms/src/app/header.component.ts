import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  @Output() selectedFeatureEvent = new EventEmitter<string>();

    onSelected(feature: string) {
        this.selectedFeatureEvent .emit(feature);
    }
}

import { Component } from '@angular/core'

@Component({
    selector: 'app-waring-alert',
    template: `
    <p>This is a warning, you are in danger</p>
    `,
    styles:[
        `
        p {
            padding: 20px;
            color: white;
            background-color: red;
            border: 2px solid black;
        }
        `
    ]
})

export class WarningAlertComponent {

}
import { Component, Input } from '@angular/core';

@Component({
    selector: 'lookup-component',
    moduleId: module.id,
    templateUrl: 'lookup.html'
})

export class LookupComponent {
    @Input() lookup: any[];
    @Input() lookupselected: string;
}
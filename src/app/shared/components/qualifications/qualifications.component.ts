import { Component } from '@angular/core';
import { LanguageComponent } from '../language/language.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'qualifications',
  templateUrl: 'qualifications.html',
  styleUrls: ['qualifications.scss']
})
export class QualificationsComponent {
  selectedQualifications: string[] = [];
  constructor(private dialogRef: MatDialogRef<QualificationsComponent>) {}

  onSelection(e, v) {
    this.selectedQualifications = v.selected.map(item => item);
  }

  onSubmit() {
    this.dialogRef.close({
      qualifications: this.selectedQualifications.map(item => item['value'])
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}

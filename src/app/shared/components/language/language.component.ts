import { Component } from '@angular/core';
import { QualificationsComponent } from '../qualifications/qualifications.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'language',
  templateUrl: 'language.html',
  styleUrls: ['language.scss']
})
export class LanguageComponent {
  languages: string[] = ['English', 'Arabic', 'French', 'Italian'];
  selectedLanguages: string[] = [];
  constructor(private dialogRef: MatDialogRef<QualificationsComponent>) {}

  onSelection(e, v) {
    this.selectedLanguages = v.selected.map(item => item);
  }

  onSubmit() {
    this.dialogRef.close({
      languages: this.selectedLanguages.map(item => item['value'])
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}

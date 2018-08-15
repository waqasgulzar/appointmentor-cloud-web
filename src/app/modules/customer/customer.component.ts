import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material';
import { CustomerEditComponent } from './customer-edit.component';

@Component({
  selector: 'app-customers-component',
  moduleId: module.id,
  templateUrl: 'customer.html'
})
export class CustomerComponent implements OnInit {
  customers: _model.Customer[];
  customer: _model.Customer;
  custForm: FormGroup;
  savebuttonText: string = "Save";
  removeCustomerId: number = 0;
  updatedCustomerId: number = 0;
  customerName: string = "";
  email: string = "";
  contactNumber: string = "";
  gender: string = "";
  profileImage: File;
  addressline1: string = "";
  isEmptyMessage: boolean = true;
  isMessageSend: boolean = false;
  isEmptySubject: boolean = true;
  isSubjectSend: boolean = false;
  submitted = false;
  fileToUpload: File = null;
  formData = new FormData();

  constructor(private fb: FormBuilder, private customerService: _api.CustomerService, private router: Router, private dialog: MatDialog) {
    this.LoadCustomers();

  }

  ngOnInit() {
    this.custForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      mobileNumber: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      contactNumber: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      emailAddress: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])],
      twitterUserName: ['', Validators.maxLength(50)],
      gender: ['1'],
      dateOfBirth: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      unsubscribed: [false],
      addressLine1: ['', Validators.maxLength(50)],
      addressLine2: ['', Validators.maxLength(50)],
      city: ['', Validators.maxLength(50)],
      postCode: ['', Validators.maxLength(50)],
      tags: [''],
      firstNameSearch: [''],
      lastNameSearch: [''],
      emailAddressSearch: [''],
      citySearch: ['']
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.formData.append('file', files[0], files[0].name);
  }

  ClearFields() {
    
    this.savebuttonText = "Save";
    this.updatedCustomerId = 0;
    this.removeCustomerId = 0;
    this.LoadCustomers();
  }
  LoadCustomers() {
    this.customerService.getAll().subscribe((data: any) => {
      this.customers = data;
    });
  }
  LoadCustomerById(customerId: number) {
    this.savebuttonText = "Update";
    this.updatedCustomerId = customerId;
    this.removeCustomerId = 0;
    this.customerService.get(customerId)
      .subscribe((data: any) => {
        var obj = data[0];
        var genderStatus = obj["gender"] == true ? "1" : "0";
      });
  }
  LoadCustomerQuickViewById(customerId: number) {
    this.customerName = "";
    this.email = "";
    this.contactNumber = "";
    this.gender = "";
    this.addressline1 = "";
    this.updatedCustomerId = customerId;

    this.customerService.get(customerId)
      .subscribe((data: any) => {
        var obj = data[0];
        this.customerName = obj["firstName"] + " " + obj["lastName"];
        this.email = obj["emailAddress"];
        this.contactNumber = obj["contactNumber"];
        this.gender = obj["gender"] == true ? "Male" : "Female";
        this.addressline1 = obj["addressLine1"];
      });
  }

  CustomerIdForDelete(customerId: number) {
    this.removeCustomerId = customerId;
    console.log(this.removeCustomerId);
  }
  RemoveCustomer() {
    this.customerService.delete(this.removeCustomerId).subscribe((data: any) => {
      this.LoadCustomers();
      this.ClearFields();
    });
  }
  SearchCustomers(firstname: any, lastname: any, emailaddress: any, city: any) {
    let customer = {
      organizationId: Number(sessionStorage.getItem("organizationId")),
      firstName: firstname.value,
      lastName: lastname.value,
      emailAddress: emailaddress.value,
      city: city.value
    } as _model.Customer;
    this.customerService.search(customer).subscribe((data: any) => {
      this.customers = data;
    });
  }
  SendByEmailSubject(emailbysubject: any, emailbymessage: any) {

    if (emailbysubject.value.trim() == "" || emailbymessage.value.trim() == "") {
      this.isEmptySubject = true;
      this.isSubjectSend = false;
    }
    else {
      this.isSubjectSend = true;
      this.isEmptySubject = false;

      //this.customerService.postEmail(this.updatedCustomerId, emailbysubject.value, emailbymessage.value).subscribe((data: any) => {
      //  emailbysubject.value = "";
      //  emailbymessage.value = "";
      //});
    }
  }
  SendByEmailMessage(emailbymessage: any) {

    if (emailbymessage.value.trim() == "") {
      this.isEmptyMessage = true;
      this.isMessageSend = false;
    }
    else {
      this.isMessageSend = true;
      this.isEmptyMessage = false;
      //this.customerService.postEmail(this.updatedCustomerId, "", emailbymessage.value).subscribe((data: any) => {
      //  emailbymessage.value = "";
      //});
    }
  }

  onSubmit(formData: any) {
    this.submitted = true;
    if (formData.valid) {
      //console.log(this.customer);
      var genderStatus = formData.controls["gender"].value == "1" ? true : false;
      let customer = {
        customerId: this.updatedCustomerId,
        organizationId: Number(sessionStorage.getItem("organizationId")),
        firstName: formData.controls["firstName"].value,
        lastName: formData.controls["lastName"].value,
        mobileNumber: formData.controls["mobileNumber"].value,
        contactNumber: formData.controls["contactNumber"].value,
        emailAddress: formData.controls["emailAddress"].value,
        twitterUserName: formData.controls["twitterUserName"].value,
        gender: genderStatus,
        dateOfBirth: formData.controls["dateOfBirth"].value,
        unsubscribed: formData.controls["unsubscribed"].value,
        addressLine1: formData.controls["addressLine1"].value,
        addressLine2: formData.controls["addressLine2"].value,
        city: formData.controls["city"].value,
        postCode: formData.controls["postCode"].value,
        profileImage: this.profileImage && this.profileImage.name || '',
        isDeleted: false
      } as _model.Customer;
      if (this.updatedCustomerId == 0) {
        this.customerService.create(this.customer).subscribe((data: any) => {
          this.LoadCustomers();
        });
      } else {
        this.customerService.update(this.updatedCustomerId, this.customer).subscribe((data: any) => {
          this.LoadCustomers();
        });
      }
      this.ClearFields();
    }
  }

  newCustomer() {
    const dialogRef = this.dialog.open(CustomerEditComponent,
      {
        panelClass: 'appointment-booking-dialog',
        data: new _model.Customer()
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(JSON.stringify(result));
    });
  }

  onClose($event) {
    //this.dialog.close();
  }
}
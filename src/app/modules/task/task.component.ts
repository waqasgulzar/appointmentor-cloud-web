import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { TaskService } from './task.service';
import { ResourceTask } from './task';
import { ResourcesService } from '../../modules/resources/resources.service';
import { Resource } from '../../modules/resources/resource';
import { CustomerService } from '../../modules/customer/customer.service';
import { Customer } from '../../modules/customer/customer';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  moduleId: module.id,
  templateUrl: 'task.html'
})
export class TaskComponent implements OnInit {
  tasks: ResourceTask[];
  task: ResourceTask;
  resources: Resource[];
  customers: Customer[];
  isMenuhidden: boolean = false;
  removeTaskId: number;
  userForm: FormGroup;
  submitted = false;
  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private taskService: TaskService,
    private customerService: CustomerService,
    private resourcesService: ResourcesService,
    private router: Router
  ) {
    if (sessionStorage.getItem('isMenuhidden') == 'true') {
      this.isMenuhidden = true;
    }
  }
  ngOnInit() {
    this.ClearFields();
  }
  LoadResources() {
    this.resourcesService
      .getResources(Number(sessionStorage.getItem('organizationId')))
      .subscribe((data: any) => {
        this.resources = data['results'];
      });
  }
  LoadCustomers() {
    this.customerService
      .get(Number(sessionStorage.getItem('organizationId')))
      .subscribe((data: any) => {
        this.customers = data['results'];
      });
  }
  LoadTasks() {
    this.taskService
      .get(Number(sessionStorage.getItem('organizationId')))
      .subscribe((data: any) => {
        console.log(data['results']);
        this.tasks = data['results'];
      });
  }
  TaskIdForDelete(taskId: number) {
    this.removeTaskId = taskId;
  }
  RemoveTask() {
    this.taskService
      .delete(this.removeTaskId)
      .subscribe((data: any) => {
        this.LoadTasks();
        this.ClearFields();
      });
  }
  ClearFields() {
    this.userForm = this.fb.group({
      taskName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ],
      drpresources: [''],
      drpcustomers: [''],
      dueDate: ['']
    });
    this.LoadResources();
    this.LoadCustomers();
    this.LoadTasks();
  }
  onChange(taskId: number, event: any) {
    if (!event.target.checked) {
      this.taskService.put(taskId, false).subscribe((data: any) => {
        this.ClearFields();
      });
    } else {
      this.taskService.put(taskId, true).subscribe((data: any) => {
        this.ClearFields();
      });
    }
  }

  onSubmit(formData: any) {
    this.submitted = true;
    if (!formData.invalid) {
      this.spinner.show();
      this.task = {
        taskId: 0,
        taskName: formData.controls['taskName'].value,
        resourceId: formData.controls['drpresources'].value,
        resourceName: '',
        dueDate: formData.controls['dueDate'].value,
        customerId: formData.controls['drpcustomers'].value,
        customerName: '',
        details: '',
        isTaskCompleted: false,
        completedDate: null,
        isDeleted: false
      };
      this.taskService.post(this.task).subscribe((data: any) => {
        this.ClearFields();
      });
      this.spinner.hide();
    }
  }
}

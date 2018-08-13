import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  moduleId: module.id,
  templateUrl: 'task.html'
})
export class TaskComponent implements OnInit {
  tasks: _model.ResourceTask[];
  task: _model.ResourceTask;
  resources: _model.Resource[];
  customers: _model.Customer[];
  isMenuhidden: boolean = false;
  removeTaskId: number;
  userForm: FormGroup;
  submitted = false;
  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private taskService: _api.TaskService,
    private customerService: _api.CustomerService,
    private resourcesService: _api.ResourceService,
    private router: Router
  ) {

  }
  ngOnInit() {
    this.ClearFields();
  }
  LoadResources() {
    this.resourcesService.getAll()
      .subscribe((data: any) => {
        this.resources = data;
      });
  }
  LoadCustomers() {
    this.customerService.getAll()
      .subscribe((data: any) => {
        this.customers = data;
      });
  }
  LoadTasks() {
    this.taskService
      .getAll()
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
    this.taskService.update(taskId, null).subscribe((data: any) => {
      this.ClearFields();
    });
  }

  onSubmit(formData: any) {
    this.submitted = true;
    if (!formData.invalid) {
      this.spinner.show();
      let task = {
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
      } as _model.ResourceTask;
      this.taskService.create(task).subscribe((data: any) => {
        this.ClearFields();
      });
      this.spinner.hide();
    }
  }
}

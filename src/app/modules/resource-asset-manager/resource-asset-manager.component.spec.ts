import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAssetManagerComponent } from './resource-asset-manager.component';

describe('ResourceAssetManagerComponent', () => {
  let component: ResourceAssetManagerComponent;
  let fixture: ComponentFixture<ResourceAssetManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceAssetManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceAssetManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

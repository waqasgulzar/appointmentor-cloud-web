import { Component, forwardRef } from '@angular/core';
import * as _model from '../../../shared/models/models';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: 'address.html',
  styleUrls: ['address.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressComponent),
      multi: true
    }
  ]
})
export class AddressComponent implements ControlValueAccessor {
  private _onChange = (_: any) => {};
  private _onTouched = (_: any) => {};
  disabled = false;

  private _value: _model.Address = {
    houseNo: undefined,
    addressLine1: undefined,
    addressLine2: undefined,
    city: undefined,
    postcode: undefined,
    state: undefined,
    county: undefined,
    country: undefined
  };

  set value(value: _model.Address) {
    this._value = value;
    this._onChange(this._value);
  }

  get value() {
    return this._value;
  }

  writeValue(value: _model.Address): void {
    if (value && value !== null) {
      this._value = value;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: (_: any) => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _updateValue(event: any, field: string) {
    const newValue = this._value;
    newValue[field] = event.target.value;
    this.value = newValue;
  }
}

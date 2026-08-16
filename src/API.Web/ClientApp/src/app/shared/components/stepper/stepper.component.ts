import { Component, OnInit } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { NgTemplateOutlet } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

/**
 * Checkout progress control over `CdkStepper`.
 *
 * CDK supplies the state machine and no styling, which is the right split: the
 * steps have to look like the rest of the application, and none of those visual
 * decisions belong to a component library.
 */
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
  imports: [NgTemplateOutlet, IconComponent],
})
export class StepperComponent extends CdkStepper implements OnInit {
  ngOnInit(): void {
    // Linear: a step cannot be reached until the ones before it validate.
    this.linear = true;
  }

  /** Going back is always allowed; going forward is not, until the step validates. */
  select(index: number): void {
    if (index < this.selectedIndex) {
      this.selectedIndex = index;
    }
  }
}

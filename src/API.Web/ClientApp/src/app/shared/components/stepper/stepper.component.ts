import { Component, Input, OnInit } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { NgFor, NgTemplateOutlet } from '@angular/common';

/**
 * Checkout progress control over `CdkStepper`.
 *
 * CDK gives the state machine and no styling, which is the right split here: the
 * steps have to look like the rest of the application, and none of the visual
 * decisions belong to a component library.
 */
@Component({
    selector: 'app-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss'],
    providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
    imports: [NgFor, NgTemplateOutlet]
})
export class StepperComponent extends CdkStepper implements OnInit {
  @Input() linearModeSelected = true;

  ngOnInit(): void {
    this.linear = this.linearModeSelected;
  }

  /** Going back is always allowed; going forward is not, until the step validates. */
  select(index: number): void {
    if (index < this.selectedIndex) {
      this.selectedIndex = index;
    }
  }
}

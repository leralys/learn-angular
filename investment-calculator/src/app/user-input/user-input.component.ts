import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type InvestmentInput } from '../investment-input.model';

interface EnteredData {
  initialInvestment: string;
  annualInvestment: string;
  expectedReturn: string;
  duration: string;
}

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  @Output() calculate = new EventEmitter<InvestmentInput>();

  enteredData: EnteredData = {
    initialInvestment: '0',
    annualInvestment: '0',
    expectedReturn: '5',
    duration: '10',
  };

  onSubmit() {
    this.calculate.emit({
      initialInvestment: +this.enteredData.initialInvestment,
      annualInvestment: +this.enteredData.annualInvestment,
      expectedReturn: +this.enteredData.expectedReturn,
      duration: +this.enteredData.duration,
    });
  }
}

import { Injectable, signal } from '@angular/core';
import { InvestmentInput } from '../user-input/investment-input.model';
import { InvestmentResult } from './models/investment-result.model';

@Injectable({ providedIn: 'root' })
export class InvestmentService {
  // resultsData?: InvestmentResult[] | undefined; // // same as below, but:
  // // Use when you don’t need reactivity (i.e., no automatic UI updates when the value changes).
  // // You’re planning to manually set this later (e.g., in ngOnInit() or from a parent input).
  resultsData = signal<InvestmentResult[] | undefined>(undefined);
  //Use signals when:
  // •	You want reactivity: e.g. the component should automatically update when resultsData() changes.
  // •	You’re using Angular’s new signals-based reactivity model instead of RxJS or manual change detection.

  calculateInvestmentResults(data: InvestmentInput) {
    const { initialInvestment, duration, expectedReturn, annualInvestment } =
      data;
    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    // this.resultsData = annualData;
    this.resultsData.set(annualData); // for a signal
  }
}

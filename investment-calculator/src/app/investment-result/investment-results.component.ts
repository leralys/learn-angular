import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  // constructor(public investmentService: InvestmentService) {} // same as below
  private investmentService = inject(InvestmentService);

  // NOTE! If this.investmentService.resultsData is a signal, then this will return the signal itself, not its value — and won’t trigger reactivity.
  // This is a plain JavaScript getter:
  // •	It returns the current value of resultsData.
  // •	It does not track reactivity — Angular won’t know to re-run or re-render anything if the value inside resultsData changes.
  // •	It only works reactively if you’re using something like @Input() or manually triggering change detection.
  // get results() {
  //   return this.investmentService.resultsData;
  // }

  // results = this.investmentService.resultsData.asReadonly(); // same as below - you can call asReadonly on signal to get a read only version of signals
  results = computed(() => this.investmentService.resultsData()); // this returns computed read-only signal instead of writable signal
  // Use computed() when you’re in signal-land
}

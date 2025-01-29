import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';  // Import Chart.js and register components

@Component({
  selector: 'app-payment-analytics',
  templateUrl: './payment-analytics.component.html',
  styleUrls: ['./payment-analytics.component.css']
})
export class PaymentAnalyticsComponent implements OnInit {
  lenderId: string | null = '';
  chartData: any; // Store your data here
  errorMessage: string = '';
  selectedLoanType: string = ''; // Store the selected loan type
  chartInstance: Chart | null = null; // Store the chart instance

  constructor(private route: ActivatedRoute, private http: HttpClient, private cdr: ChangeDetectorRef) {
    // Register all necessary components (scales, elements, etc.)
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.lenderId = params['lenderId'] || null;
      if (this.lenderId) {
        console.log('Lender ID:', this.lenderId);
        this.fetchAnalyticsData(); // Fetch analytics data initially
      } else {
        console.error('Lender ID is not provided');
      }
    });
  }

  

  // Handle loan type selection change
  onLoanTypeChange(): void {
    if (this.selectedLoanType) {
      this.fetchAnalyticsData(); // Fetch analytics data based on the selected loan type
    }
  }

  fetchAnalyticsData(): void {
    if (!this.selectedLoanType) {
      return;
    }

    const url = `http://localhost:8080/api/analytics/${this.lenderId}?loanType=${this.selectedLoanType}`;
    this.http.get(url).subscribe({
      next: (data) => {
        this.chartData = data;
        this.createCharts();
      },
      error: (error) => {
        this.errorMessage = "No Analytics Found for the selected loan type";
        console.error('Error fetching analytics data:', error);
      }
    });
  }

  createCharts() {
    if (!this.chartData) {
      console.error('Chart data is not available');
      return;
    }

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      // Destroy the previous chart if it exists
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Create the new chart
      this.chartInstance = new Chart(ctx, {
        type: 'bar', // Example chart type
        data: {
          labels: ['Total Loans Disbursed', 'Total Outstanding Balance', 'Total Revenue From Interest'], // Set appropriate labels
          datasets: [
            {
              label: 'Analytics',
              data: [
                this.chartData.totalLoansDisbursed, // Total Loans Disbursed
                this.chartData.totalOutstandingBalance, // Total Outstanding Balance
                this.chartData.totalRevenueFromInterest, // Total Revenue From Interest
              ],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',  // Color for Total Loans Disbursed
                'rgba(75, 192, 192, 0.2)',  // Color for Total Outstanding Balance
                'rgba(153, 102, 255, 0.2)', // Color for Total Revenue From Interest
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',  // Border color for Total Loans Disbursed
                'rgba(75, 192, 192, 1)',  // Border color for Total Outstanding Balance
                'rgba(153, 102, 255, 1)', // Border color for Total Revenue From Interest
              ],
              borderWidth: 1
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Canvas element not found');
    }
    this.cdr.detectChanges();
  }
}



// import { Component, AfterViewInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Chart, registerables } from 'chart.js';  // Import Chart.js and register components

// @Component({
//   selector: 'app-payment-analytics',
//   templateUrl: './payment-analytics.component.html',
//   styleUrls: ['./payment-analytics.component.css']
// })
// export class PaymentAnalyticsComponent implements AfterViewInit {
//   lenderId: string | null = '';
//   chartData: any; // Store your data here
//   errorMessage: string = '';

//   constructor(private route: ActivatedRoute, private http: HttpClient) {
//     // Register all necessary components (scales, elements, etc.)
//     Chart.register(...registerables);
//   }
  
//   ngAfterViewInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.lenderId = params['lenderId'] || null;
//       if (this.lenderId) {
//         console.log('Lender ID:', this.lenderId);
//         this.fetchAnalyticsData();
//       } else {
//         console.error('Lender ID is not provided');
//       }
//     });
//   }

//   fetchAnalyticsData(): void {
//     const url = `http://localhost:8080/api/analytics/${this.lenderId}`;
//     this.http.get(url).subscribe({
//       next: (data) => {
//         this.chartData = data;
//         this.createCharts();
//       },
//       error: (error) => {
//         this.errorMessage="No Anallytics Found"
//         //console.error('Error fetching analytics data:', error);
//       }
//     });
//   }

//   createCharts() {
//     if (!this.chartData) {
//       console.error('Chart data is not available');
//       return;
//     }

//     const ctx = document.getElementById('myChart') as HTMLCanvasElement;
//     if (ctx) {
//       // Create the chart here using the available data
//       new Chart(ctx, {
//         type: 'bar', // Example chart type
//         data: {
//           labels: ['Total Loans Disbursed', 'Total Outstanding Balance', 'Total Revenue From Interest'], // Set appropriate labels
//           datasets: [
//             {
//               label: 'Analytics',
//               data: [
//                 this.chartData.totalLoansDisbursed, // Total Loans Disbursed
//                 this.chartData.totalOutstandingBalance, // Total Outstanding Balance
//                 this.chartData.totalRevenueFromInterest, // Total Revenue From Interest
//               ],
//               backgroundColor: [
//                 'rgba(54, 162, 235, 0.2)',  // Color for Total Loans Disbursed
//                 'rgba(75, 192, 192, 0.2)',  // Color for Total Outstanding Balance
//                 'rgba(153, 102, 255, 0.2)', // Color for Total Revenue From Interest
//               ],
//               borderColor: [
//                 'rgba(54, 162, 235, 1)',  // Border color for Total Loans Disbursed
//                 'rgba(75, 192, 192, 1)',  // Border color for Total Outstanding Balance
//                 'rgba(153, 102, 255, 1)', // Border color for Total Revenue From Interest
//               ],
//               borderWidth: 1
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       });
//     } else {
//       console.error('Canvas element not found');
//     }
//   }
// }

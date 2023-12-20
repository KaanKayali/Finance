import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AccountBalance, AccountService } from 'src/app/services/account.service';
import { TransactionConfirmation, TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor(private router: Router, public authService: AuthService,  private accountService: AccountService, private transactionService: TransactionService) {

  }
  title = "Dashboard";

  latestTransactions: TransactionConfirmation[] = [];
  disablePrevButton = false;
  disableNextButton = false;
  min: number = 0;
  max: number = 10;

  previousPage(): void {
    if (this.min > 0){
      this.min -= 10;
      this.max -= 10;
    }
  }

  nextPage(): void {
    if (this.max < this.latestTransactions.length) {
      this.min += 10;
      this.max += 10;
    }
  }

  account!: AccountBalance;
  firstname!: string;
  lastname!: string;
  accNumber!: string;
  jwt!: string;

  targetInput: string | undefined;
  amountInput: string | boolean | null | undefined;

  fromInput!: string;
  toInput!: number;

  balance!: string;
  fromValue!: string;

  ngOnInit(): void {
    this.jwt = localStorage.getItem("JWT") || '';

    if(this.jwt){
      this.loadAccountDetails();
      this.loadLatestTransactions();
    }
    else{
      this.router.navigate(["/login"]);
    }

  }

  loadAccountDetails(): void {
    this.accountService.getCurrentBalance(this.jwt)
    .subscribe({
      //Objekt laden
      next: acc => {
        this.account = acc;
        this.firstname = acc.owner.firstname;
        this.lastname = acc.owner.lastname;
        this.accNumber = acc.accountNr;
        this.balance = acc.amount.toString();
        
        this.fromValue = this.accNumber + " [" + this.balance + " CHF]";  
      },
      error: e => {
        console.log(e);
      }
    });
  }

  loadLatestTransactions(): void {
    this.transactionService.getTransactions(this.jwt, undefined, undefined, 100000, 0)
    .subscribe({
      next: transaction => {
        this.latestTransactions = transaction.result;
      },
      error: e => {
        console.log(e);
      }
    });
  }

  Pay(payForm:NgForm){
    if(this.toInput.toString() && (this.amountInput) && (payForm && payForm.valid) && (this.toInput.toString() !== this.fromInput)){
      this.transactionService.transfer(this.jwt, { target: this.toInput.toString(), amount: Number(this.amountInput) })
      .subscribe({
        next: (newTransaction: TransactionConfirmation) => {
          // Handle successful transfer
          this.latestTransactions.unshift(newTransaction); // Add the new transaction to the beginning of the array
          this.loadAccountDetails();
        },
        error: e => {
          console.log(e);
        }
      });
    }
  }

  logout(): void {
    //JWT entfernen
    localStorage.removeItem("JWT");
    this.router.navigate(['/login']);
  }
}






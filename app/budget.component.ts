import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Account } from './account';
import { AccountService } from './account.service';
import { Budget } from './budget';

@Component({
    selector: 'budget',
    templateUrl: 'app/budget.component.html'
})

export class BudgetComponent {
    @Input() budget: Budget;
    
    constructor() { }
    
    ngOnInit() { }
}

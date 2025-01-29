import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteStatusService {
  private deleteStatusSubject = new BehaviorSubject<boolean>(false); // Initial value
  deleteStatus$ = this.deleteStatusSubject.asObservable();

  emitDeleteStatus(status: boolean): void {
    console.log('Emitting status:', status);
    this.deleteStatusSubject.next(status); // Emit the status
  }
}

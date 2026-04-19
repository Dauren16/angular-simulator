import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();
  filterControl: FormControl = new FormControl('');
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap((value: string | null) => this.filterChange.emit(value ?? '')),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}

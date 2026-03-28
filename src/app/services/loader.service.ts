import { inject, Injectable, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private rendererFactory = inject(RendererFactory2);
  private renderer = this.rendererFactory.createRenderer(null, null);

  loader$: Observable<boolean> = this.loaderSubject.asObservable();

  constructor() {
    this.simulateLoading();
  }

  showLoader(): void {
    this.loaderSubject.next(true);
    this.renderer.addClass(document.body, 'no-scroll');
    
  }

  hideLoader(): void {
    this.loaderSubject.next(false);
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  simulateLoading(): void {
    this.showLoader();
    setTimeout(() => {
      this.hideLoader()
    }, 2000);
  }

}

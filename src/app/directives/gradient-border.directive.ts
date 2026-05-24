import { Directive, ElementRef, HostListener, inject, Input, OnDestroy, Renderer2 } from '@angular/core';
import { IGradient } from '../interfaces/IGradient';

@Directive({
  selector: '[appGradientBorder]',
})
export class GradientBorderDirective implements OnDestroy {

  @Input() gradientConfiguration: IGradient = {}

  private timer!: number;
  private el: ElementRef = inject(ElementRef);
  private render: Renderer2 = inject(Renderer2);

  @HostListener('mouseenter')
   onMouseEnter(): void {
    this.timer = setTimeout(() => {
      this.render.setStyle(this.el.nativeElement, 'transition', 'border 0.3s ease');
      this.render.setStyle(this.el.nativeElement, 'border', `${ this.gradientConfiguration.thickness || 2 }px solid`);
      const colors: string = this.gradientConfiguration.colors?.join(', ') || 'pink, purple';
      this.render.setStyle(this.el.nativeElement, 'border-image', `linear-gradient(${ colors }) 1`);
    }, this.gradientConfiguration.delay || 1000);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    clearTimeout(this.timer);
    this.render.removeStyle(this.el.nativeElement, 'border');
    this.render.removeStyle(this.el.nativeElement, 'border-image');
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }

}

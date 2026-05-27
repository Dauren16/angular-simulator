import { Directive, ElementRef, HostListener, inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { GradientConfiguration } from '../interfaces/GradientConfiguration';

@Directive({
  selector: '[appGradientBorder]',
})
export class GradientBorderDirective implements OnInit, OnDestroy {

  @Input() gradientConfiguration: GradientConfiguration = {}

  private defaultConfig: GradientConfiguration = {
    delay: 1000,
    colors: ['pink', 'purple'],
    thickness: 2
  };

  private config!: GradientConfiguration; 
  private timer!: number;
  private el: ElementRef = inject(ElementRef);
  private render: Renderer2 = inject(Renderer2);

  ngOnInit(): void {
    this.config = { ...this.defaultConfig, ...this.gradientConfiguration };
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.timer = setTimeout(() => {
      this.render.setStyle(this.el.nativeElement, 'transition', 'border 0.3s ease');
      this.render.setStyle(this.el.nativeElement, 'border', `${this.config.thickness}px solid`);
      const colors = this.config.colors!.join(', ');
      this.render.setStyle(this.el.nativeElement, 'border-image', `linear-gradient(${colors}) 1`);
    }, this.config.delay);
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

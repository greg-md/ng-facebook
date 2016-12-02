import {Directive, HostListener, OnInit, Input, ElementRef, AfterViewInit} from '@angular/core';

import { inViewport } from './facebook.utils';

import { FacebookService } from './facebook.service';

@Directive({
  selector: '[gg-fb-parse]',
})
export class FacebookParseDirective implements OnInit, AfterViewInit {
  @Input('lazy-load') lazyLoad: boolean = true;

  @Input() threshold: number = 0;

  @Input() container: HTMLElement | Window;

  loaded = false;

  constructor(private elementRef: ElementRef, private fb: FacebookService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.check();
  }

  @HostListener('window:scroll') @HostListener('window:resize') listener() {
    if (this.loaded) {
      return false;
    }

    this.check();
  }

  check() {
    if (!this.lazyLoad || inViewport(this.elementRef.nativeElement, {threshold: this.threshold, container: this.container})) {
      this.fb.parse(this.elementRef.nativeElement);

      this.loaded = true;
    }
  }
}

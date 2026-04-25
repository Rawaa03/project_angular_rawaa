import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appShowError]',
  standalone: true
})
export class ShowErrorDirective implements OnInit {

  @Input('appShowError') control!: AbstractControl | null;
  @Input() errorType!: string;

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.control?.statusChanges.subscribe(() => {
      this.updateView();
    });

    this.updateView();
  }

  updateView() {
    this.vcr.clear();

    if (this.control?.errors?.[this.errorType] && this.control.touched) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }
}
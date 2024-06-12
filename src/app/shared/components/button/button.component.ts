import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {
  @Input() variants: 'primary' | 'secondary' | 'danger' | 'plain' | 'noStyle' =
    'primary';
  @Input() customStyle = '';
  @Input() isDisabled: boolean | null = false;
  @Output() onClick = new EventEmitter();
  variantStyle = '';

  variantFunc() {
    switch (this.variants) {
      case 'primary':
        this.variantStyle =
          'bg-gradient-to-br from-[#007DA0] to-[#0092BB] border-0 text-white';
        break;
      case 'secondary':
        this.variantStyle =
          'border-2 bg-transparent text-bluePrimary border-bluePrimary';
        break;
      case 'danger':
        this.variantStyle =
          'border-0 bg-gradient-to-br from-[#F24538] to-[#F56A60] text-white';
        break;
      default:
        this.variantStyle = '';
    }
  }

  onClickEvent() {
    this.onClick.emit();
  }

  ngOnInit(): void {
    this.variantFunc();
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent, LucideAngularModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  btnVariant: 'noStyle' = 'noStyle';
  arrPage: number[] = [];
  @Input() totalPage: number = 1;
  @Input() activePage: number = 1;
  @Output() pageBtn = new EventEmitter<number>();

  fillArrPage() {
    for (let i = 0; i < this.totalPage; i++) {
      this.arrPage.push(i + 1);
    }
  }

  onPageClick(page: number) {
    this.pageBtn.emit(page);
  }

  ngOnInit(): void {
    this.fillArrPage();
    console.log(this.totalPage);
  }
}

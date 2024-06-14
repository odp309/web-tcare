import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { LucideAngularModule } from 'lucide-angular';
import { ClickOutsideDirective } from '../../directives/click-outside/click-outside.directive';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { regNumberMoreThanZero } from '../../utils/regexPattern';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    ButtonComponent,
    LucideAngularModule,
    ClickOutsideDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  form!: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      firstDot: ['', [Validators.pattern(regNumberMoreThanZero)]],
      lastDot: ['', [Validators.pattern(regNumberMoreThanZero)]],
    });
  }

  firstPage = 1;
  numOfPageShowed = 4;
  numOfLoops = 0;
  numOfLoopsChanger = 1;
  btnVariant: 'noStyle' = 'noStyle';
  arrPage: number[] = [];
  isBtnDisabled = {
    prev: true,
    next: false,
  };
  isDotClicked = {
    first: false,
    last: false,
  };
  @Input() totalPage: number = 1;
  @Input() activePage: number = 1;
  @Output() pageBtn = new EventEmitter<number>();

  get firstDot() {
    return this.form.get('firstDot');
  }
  get lastDot() {
    return this.form.get('lastDot');
  }

  fillArrPage() {
    if (
      !this.arrPage.includes(this.activePage) &&
      this.activePage > this.arrPage[this.arrPage.length - 1]
    ) {
      this.numOfLoops += this.numOfLoopsChanger;
    }
    if (
      !this.arrPage.includes(this.activePage) &&
      this.activePage < this.arrPage[0]
    ) {
      this.numOfLoops -= this.numOfLoopsChanger;
    }

    const tempArr: number[] = [];

    if (this.numOfLoopsChanger * this.numOfPageShowed <= this.totalPage) {
      if (this.activePage % 4 === 0) {
        for (let i = 0; i < this.numOfPageShowed; i++) {
          tempArr.push(this.activePage - this.numOfPageShowed + (i + 1));
        }
      } else {
        for (
          let i = 0;
          i < this.numOfPageShowed &&
          this.numOfLoops * this.numOfPageShowed + i + 1 <= this.totalPage;
          i++
        ) {
          tempArr.push(this.numOfLoops * this.numOfPageShowed + i + 1);
        }
      }

      this.arrPage = tempArr;
    }
  }

  filterInput(event: Event, whatDot: string) {
    const inputDot = this.form.get(whatDot);
    if (inputDot) {
      const targetValue = event.target as HTMLInputElement;
      let inputValue = targetValue.value.replace(/^0+|[^0-9]/g, '');
      const numericValue = parseInt(inputValue);
      if (numericValue > this.totalPage) {
        inputValue = this.totalPage.toString();
      }
      targetValue.value = inputValue;
      inputDot.setValue(inputValue);
    }
  }

  onSearchPage(whatDot: 'first' | 'last') {
    if (whatDot === 'first') {
      this.isDotClicked.first = true;
    }
    if (whatDot === 'last') {
      this.isDotClicked.last = true;
    }
  }

  onKeyDown(e: KeyboardEvent, whatDot: string) {
    if (e.key.toLowerCase() !== 'enter') {
      return;
    }
    if (this.lastDot && whatDot === 'lastDot') {
      this.countLoopsChanger(parseInt(this.lastDot.value));
      this.pageBtn.emit(this.lastDot.value);
      this.isDotClicked.last = false;
      this.lastDot.setValue('');
      return;
    }
    if (this.firstDot && whatDot === 'firstDot') {
      this.countLoopsChanger(parseInt(this.firstDot.value));
      this.pageBtn.emit(this.firstDot.value);
      this.isDotClicked.first = false;
      this.firstDot.setValue('');
      return;
    }
  }

  onClickOutside() {}

  onPageNextPrev(whatBtn: 'next' | 'prev') {
    this.numOfLoopsChanger = 1;
    if (whatBtn === 'next' && this.activePage < this.totalPage) {
      this.isBtnDisabled.prev = false;
      this.pageBtn.emit((this.activePage += 1));
    }
    if (whatBtn === 'next' && this.activePage === this.totalPage) {
      this.isBtnDisabled.next = true;
      this.isBtnDisabled.prev = false;
    }
    if (whatBtn === 'prev' && this.activePage > 1) {
      this.isBtnDisabled.next = false;
      this.pageBtn.emit((this.activePage -= 1));
    }
    if (whatBtn === 'prev' && this.activePage === 1) {
      this.isBtnDisabled.prev = true;
      this.isBtnDisabled.next = false;
    }
  }

  countLoopsChanger(page: number) {
    this.numOfLoopsChanger =
      Math.floor(page / this.numOfPageShowed) - this.numOfLoops;
  }

  onPageClick(page: number) {
    this.countLoopsChanger(page);
    if (page < this.totalPage) {
      this.isBtnDisabled.prev = false;
    }
    if (page > 1) {
      this.isBtnDisabled.next = false;
    }
    if (page === this.totalPage) {
      this.isBtnDisabled.next = true;
      this.isBtnDisabled.prev = false;
    }
    if (page === 1) {
      this.numOfLoopsChanger =
        (this.arrPage[0] - this.firstPage) / this.numOfPageShowed;
      this.isBtnDisabled.prev = true;
      this.isBtnDisabled.next = false;
    }
    this.pageBtn.emit(page);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPage']) {
      this.totalPage = changes['totalPage'].currentValue;
    }
    this.fillArrPage();
  }
}

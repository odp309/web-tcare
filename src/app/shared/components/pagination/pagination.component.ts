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
  @Input() numOfLoopsChanger: number = 1;

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
    console.log('numofloopschanger', this.numOfLoopsChanger);

    if (
      this.numOfLoopsChanger * this.numOfPageShowed <= this.totalPage ||
      this.totalPage < this.numOfPageShowed
    ) {
      console.log('object');
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
    switch (whatDot) {
      case 'first':
        this.isDotClicked.first = true;
        break;
      case 'last':
        this.isDotClicked.last = true;
        break;
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
      return;
    }
    if (whatBtn === 'next' && this.activePage === this.totalPage) {
      this.isBtnDisabled.next = true;
      this.isBtnDisabled.prev = false;
      return;
    }
    if (whatBtn === 'prev' && this.activePage > 1) {
      this.isBtnDisabled.next = false;
      this.pageBtn.emit((this.activePage -= 1));
      return;
    }
    if (whatBtn === 'prev' && this.activePage === 1) {
      this.isBtnDisabled.prev = true;
      this.isBtnDisabled.next = false;
      return;
    }
  }

  countLoopsChanger(page: number) {
    this.numOfLoopsChanger =
      Math.floor(page / this.numOfPageShowed) - this.numOfLoops;
  }

  onPageClick(page: number) {
    if (page === 1) {
      this.numOfLoopsChanger =
        (this.arrPage[0] - this.firstPage) / this.numOfPageShowed;
      this.isBtnDisabled.prev = true;
      this.isBtnDisabled.next = false;
      this.pageBtn.emit(page);
      return;
    }

    this.countLoopsChanger(page);

    if (page < this.totalPage) {
      this.isBtnDisabled.prev = false;
      this.pageBtn.emit(page);
      return;
    }
    if (page > 1) {
      this.isBtnDisabled.next = false;
      this.pageBtn.emit(page);
      return;
    }
    if (page === this.totalPage) {
      this.isBtnDisabled.next = true;
      this.isBtnDisabled.prev = false;
      this.pageBtn.emit(page);
      return;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPage']) {
      this.totalPage = Math.floor(changes['totalPage'].currentValue);
    }
    this.fillArrPage();
    console.log(changes);
  }

  // ngDoCheck(): void {
  //   //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //   //Add 'implements DoCheck' to the class.
  //   console.log(this.arrPage);
  // }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';

import { BooksService } from '../books.service';
import { NewBookComponent } from './new-book.component';

describe('NewBookComponent', () => {
  let component: NewBookComponent;
  let fixture: ComponentFixture<NewBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBookComponent],
      providers: [MockProvider(BooksService)],
    }).compileComponents();

    fixture = TestBed.createComponent(NewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

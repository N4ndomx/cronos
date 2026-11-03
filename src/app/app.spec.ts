import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { UiStateStore } from './core/application/ui-state.store';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the four bottom navigation tabs', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const links = (fixture.nativeElement as HTMLElement).querySelectorAll('.bottom-nav .nav-item');

    expect(links.length).toBe(4);
  });

  it('should hide the bottom navigation while an overlay is open', () => {
    const fixture = TestBed.createComponent(App);
    const uiState = TestBed.inject(UiStateStore);

    uiState.openOverlay();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('.bottom-nav')).toBeNull();
  });
});

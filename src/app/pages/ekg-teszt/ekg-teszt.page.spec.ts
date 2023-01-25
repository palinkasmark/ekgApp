import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EkgTesztPage } from './ekg-teszt.page';

describe('EkgTesztPage', () => {
  let component: EkgTesztPage;
  let fixture: ComponentFixture<EkgTesztPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EkgTesztPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EkgTesztPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EkgPage } from './ekg.page';

describe('EkgPage', () => {
  let component: EkgPage;
  let fixture: ComponentFixture<EkgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EkgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EkgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

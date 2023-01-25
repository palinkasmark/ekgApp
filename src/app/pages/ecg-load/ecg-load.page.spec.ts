import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EcgLoadPage } from './ecg-load.page';

describe('EcgLoadPage', () => {
  let component: EcgLoadPage;
  let fixture: ComponentFixture<EcgLoadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcgLoadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EcgLoadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

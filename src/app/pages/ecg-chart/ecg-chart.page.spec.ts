import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EcgChartPage } from './ecg-chart.page';

describe('EcgChartPage', () => {
  let component: EcgChartPage;
  let fixture: ComponentFixture<EcgChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcgChartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EcgChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

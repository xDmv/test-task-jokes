import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationService } from '../services/pagination.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [PaginationService],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [{ provide: PaginationService }],
    };
  }
}

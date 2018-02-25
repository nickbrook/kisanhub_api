import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatListModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatSelectModule, MatTableModule,
    MatTooltipModule
} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  exports: [
    MatCardModule, MatButtonModule, MatButtonToggleModule, MatExpansionModule, MatToolbarModule,
    MatSelectModule, MatTooltipModule, MatCheckboxModule, MatListModule,
    MatProgressSpinnerModule, MatProgressBarModule, MatTableModule

  ]
})
export class MaterialModule { }

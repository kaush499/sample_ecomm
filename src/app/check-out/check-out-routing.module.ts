import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { ShippingComponent } from './components/shipping/shipping.component';

const checkOutRoutes: Routes = [
    { path: "", component: CheckOutComponent, canActivate: [AuthGuard], children: [
        { path: "", redirectTo: "shipping", pathMatch: "full" },
        { path: "shipping", component: ShippingComponent }
      ] }
]

@NgModule({
    imports: [
        RouterModule.forChild(checkOutRoutes)
    ],
    exports: [RouterModule]
})
export class CheckOutRoutingModule {}
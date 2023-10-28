import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthServiceService } from 'src/app/pages/components/auth/auth-service.service';
import { User } from 'src/app/pages/shareds/models/user.model';

export const canMatchAdminGuard: CanMatchFn = (route, segments) => {

    let profile_id_local: number = 0;
    inject(AuthServiceService).getUser().subscribe(
        (user:User) => {
            profile_id_local = user.profile_id;
        }
    );

  if(profile_id_local!=2) {
    alert('Permission negada');
    return false;
  }

  return true;
};

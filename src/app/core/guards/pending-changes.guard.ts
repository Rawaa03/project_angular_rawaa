import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const pendingChangesGuard: CanDeactivateFn<CanComponentDeactivate> = component => {
  const canLeave = component.canDeactivate ? component.canDeactivate() : true;

  if (canLeave) {
    return true;
  }

  return window.confirm(
    'Voulez-vous vraiment quitter ? Les modifications non sauvegardees seront perdues.'
  );
};

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyDate',
  standalone: true
})
export class FriendlyDatePipe implements PipeTransform {

  transform(value: Date | string | null | undefined): string {

    // ❌ No value
    if (!value) {
      return 'Date inconnue';
    }

    const date = new Date(value);

    // ❌ Invalid date
    if (isNaN(date.getTime())) {
      return 'Date invalide';
    }

    const today = new Date();

    // Remove time (important for correct comparison)
    const todayMidnight = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const dateMidnight = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const diffTime = todayMidnight.getTime() - dateMidnight.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Aujourd'hui";
    }

    if (diffDays === 1) {
      return "Hier";
    }

    if (diffDays > 1) {
      return `Il y a ${diffDays} jours`;
    }

    // Future date (bonus)
    return 'Date future';
  }
}
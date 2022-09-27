import moment, { MomentInput } from 'moment';

export function objIsEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

export function formatDate(date: MomentInput) {
  return moment(date, ['MM-DD-YYYY', 'YYYY-MM-DD']).format('DD/MM/YYYY');
}

export const imagens = {
  'LOGO': require('../assets/logo.png'),
};

export enum typeNotify {
  zen = 'SoyZen',
  yoga='Yoga',
  meditation='Meditación',
  taroscope = 'Astrología',
  peace_mind = 'Paz mental'
};

export interface notifyItem{
  type: typeNotify,
  title:string,
  time: string
}

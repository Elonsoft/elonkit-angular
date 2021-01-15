import { ESFileListFile } from '../file-list.types';

export const filesFixture: ESFileListFile[] = [
  {
    id: 1,
    type: 'image/jpg',
    file: 'https://dummyimage.com/400x400/405ed6/fff.jpg&text=ES',
    name: 'FileName1.jpg',
    size: 45678,
    content: null,
    updatedAt: '2014-09-08T08:02:17-05:00'
  },
  {
    id: 2,
    type: 'image/jpg',
    file: 'https://dummyimage.com/400x400/228a0f/fff.jpg&text=ES',
    name: 'Ochen_Dlinnoe_nazvanie_faila.jpg',
    size: 456789,
    content: null,
    updatedAt: '2020-10-11T08:12:17-05:00'
  },
  {
    id: 3,
    type: 'application/pdf',
    file: 'https://dummyimage.com/400x400/d6761c/fff.jpg&text=ES',
    name: 'Nazvanie_faila.pdf',
    size: 4567,
    content: null,
    updatedAt: '2009-04-02T08:08:12-05:00'
  },
  {
    id: 4,
    type: 'image/jpg',
    file: 'https://dummyimage.com/400x400/2dbdb8/fff.jpg&text=ES',
    name: 'Vtoroe_nazvanie_faila.jpg',
    size: 456,
    content: null
  }
];

import { ESImageCarouselFile } from '../image-carousel.types';

export const filesFixture: ESImageCarouselFile[] = [
  {
    id: 1,
    type: 'image/jpg',
    file: 'https://dummyimage.com/400x400/405ed6/fff.jpg&text=ES',
    name: 'FileName1.jpg',
    size: 45678,
    content: null
  },
  {
    id: 2,
    type: 'image/jpg',
    file: 'https://dummyimage.com/400x400/228a0f/fff.jpg&text=ES',
    name: 'FileName2.jpg',
    size: 456789,
    content: null
  },
  {
    id: 3,
    type: 'application/pdf',
    file: 'https://dummyimage.com/400x400/d6761c/fff.jpg&text=ES',
    name: 'FileName3.pdf',
    size: 4567,
    content: null
  },
  {
    id: 4,
    type: 'image/jpg',
    file: 'https://dummyimage.com/900x400/2dbdb8/fff.jpg&text=ES',
    name: 'FileName4.jpg',
    size: 456,
    content: null
  }
];

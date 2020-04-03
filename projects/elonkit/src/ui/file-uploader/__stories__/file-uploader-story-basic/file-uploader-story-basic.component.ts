import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'es-file-uploader-story-basic',
  templateUrl: './file-uploader-story-basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderStoryBasicComponent {
  @Input() variant: 'list' | 'grid' = 'list';
  @Input() multiple: boolean;
  @Input() required: boolean;
  @Input() accept: string;

  value = [
    {
      name: 'Image.png',
      preview:
        'https://www.vets4pets.com/siteassets/species/cat/kitten/tiny-kitten-in-field.jpg?w=585&scale=down'
    }
  ];
}

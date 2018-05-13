import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-new-pic',
  templateUrl: './new-pic.component.html',
  styleUrls: ['./new-pic.component.css'],
})
export class NewPicComponent implements OnInit {
  @ViewChild('imgCapture') private imgCapture: HTMLImageElement;
  @ViewChild('myCanvas') private myCanvas: ElementRef;

  private currentImage: any;
  private actionComment: string;
  private acceptVisible = false;
  private date: Date = new Date();

  constructor() { }
  ngOnInit() {
    this.currentImage = null;
    this.actionComment = 'Upload';
  }

  loadImageIntoCanvas(imagePath: string){
    if (this.myCanvas) {
      const img = new Image();
      const thisComponent = this;

      img.onload = function(e){
        const ctx: CanvasRenderingContext2D = thisComponent.myCanvas.nativeElement.getContext('2d');
        ctx.drawImage(img, 0, 0);
        console.log(e);
      };
      img.src = imagePath;
      console.log('Going to check on EXIF');
    }
  }

  onRotate() {
    if (!this.myCanvas) {
      return;
    }
    const img = new Image();
    const thisComponent = this;
    img.onload = function () {
      console.log('Image loaded');
      const ctx: CanvasRenderingContext2D = thisComponent.myCanvas.nativeElement.getContext('2d');
      ctx.clearRect(0, 0, thisComponent.myCanvas.nativeElement.width, thisComponent.myCanvas.nativeElement.height);
      ctx.rotate(90 * Math.PI / 180);
      ctx.drawImage(img, -200, -800);
    };
    img.src = this.currentImage;
  }

  rotateTheImage() {
    if (!this.myCanvas) {
      return;
    }

    const img = new Image();
    const thisComponent = this;

    img.onload = function () {
      console.log('Image loaded');
      const ctx: CanvasRenderingContext2D = thisComponent.myCanvas.nativeElement.getContext('2d');
      ctx.rotate(90 * Math.PI / 180);
      ctx.drawImage(img, -200, -800);
    };
    img.src = '/assets/rotated.jpg';
  }

  onImageChange(e): void {
    const files: File[] = e.target.files;
    console.log(files);

    if (files.length > 0) {
      const firstFile = files[0];

      console.log('File Name :' + firstFile.name + ' File Size:' + firstFile.size);
      const fr: FileReader = new FileReader();
      fr.addEventListener('load', () => {
        if (fr.result != null){

          // ====================================================
          // Simple Load and Show
          // ====================================================
          console.log('Assigned the required result...');
          this.currentImage = fr.result;
          this.actionComment = 'Redo';
          this.acceptVisible = true;
          // ====================================================
        }
      }, false);
      fr.readAsDataURL(firstFile);
    }
  }

  onAccept(): void{
    console.log('Here we save');
    this.currentImage = null;
    this.actionComment = 'Upload';
    this.acceptVisible = false;
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {DatepickerOptions} from 'ng2-datepicker';
import {PriceInfo} from '../../app/priceInfo';

@Component({
  selector: 'app-new-pic',
  templateUrl: './new-pic.component.html',
  styleUrls: ['./new-pic.component.css'],
})
export class NewPicComponent implements OnInit {
  @ViewChild('imgCapture') private imgCapture : HTMLImageElement;
  @ViewChild('myCanvas') private myCanvas : ElementRef;

  private currentImage: any;
  private actionComment: string;
  private acceptVisible: boolean = false;
  private date: Date = new Date();

  private prices : Array<PriceInfo> = null;
  private isInAddEditMode : boolean = false;

  public options: DatepickerOptions = {
    minYear: 2010,
    maxYear: 2022,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale:null
  };

  constructor() { }
  ngOnInit() {
    this.currentImage = null;//"assets/rotated.jpg";
    this.actionComment = "Upload";
    //this.loadImageIntoCanvas(this.currentImage);
    this.prices = new Array<PriceInfo>();
    this.prices.push(PriceInfo.getSamplePrice());
  }

  loadImageIntoCanvas(imagePath: string){
    if(this.myCanvas){
      let img = new Image();
      let thisComponent = this;
      img.onload= function(e){
        let ctx: CanvasRenderingContext2D = thisComponent.myCanvas.nativeElement.getContext('2d');
        ctx.drawImage(img, 0, 0);
        console.log(e);
      }
      img.src = imagePath;
      console.log('Going to check on EXIF');
    }     
  }

  onRotate(){
    if(this.myCanvas){
      let img = new Image();
      let thisComponent = this;
      img.onload= function(){
        console.log('Image loaded');
        let ctx: CanvasRenderingContext2D = thisComponent.myCanvas.nativeElement.getContext('2d');
        ctx.clearRect(0, 0, thisComponent.myCanvas.nativeElement.width, thisComponent.myCanvas.nativeElement.height)
        ctx.rotate(90*Math.PI/180);
        ctx.drawImage(img, -200, -800);        
      }
      img.src = this.currentImage;
    }         
  }

  rotateTheImage(){
    if(this.myCanvas){
      let img = new Image();
      let thisComponent = this;
      img.onload= function(){
        console.log('Image loaded');
        let ctx: CanvasRenderingContext2D = thisComponent.myCanvas.nativeElement.getContext('2d');
        ctx.rotate(90*Math.PI/180);
        ctx.drawImage(img, -200, -800);        
      }
      img.src = "/assets/rotated.jpg";
    } 
  }

  onImageChange(e) : void{
    let files : File[] = e.target.files;
    console.log(files);

    if(files.length>0){
      let firstFile = files[0];
      

      // this.getOrientation(firstFile, function(e){
      //   console.log(e);
      //   let sourceOrientation: number = e;
      // });
      
      console.log("File Name :" + firstFile.name + " File Size:" + firstFile.size);
      let fr : FileReader = new FileReader();
      fr.addEventListener("load", ()=>{
        if(fr.result != null){

          //====================================================  
          // Simple Load and Show
          //====================================================  
          console.log('Assigned the required result...');
          this.currentImage = fr.result;
          this.actionComment = "Redo";
          this.acceptVisible = true;
          //====================================================  
        }
      }, false);
      fr.readAsDataURL(firstFile);
    }
  }

  onAccept(): void{
    console.log('Here we save');
    this.currentImage = null;
    this.actionComment = "Upload";
    this.acceptVisible = false;
  }

  resetOrientation(srcBase64, srcOrientation, callback) {
    var img = new Image();	
  
    img.onload = function() {
      var width = img.width,
          height = img.height,
          canvas = document.createElement('canvas'),
          ctx = canvas.getContext("2d");
      
      // set proper canvas dimensions before transform & export
      if (4 < srcOrientation && srcOrientation < 9) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }
    
      // transform context before drawing image
      switch (srcOrientation) {
        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
        case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
        case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
        case 7: ctx.transform(0, -1, -1, 0, height , width); break;
        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
        default: break;
      }
  
      // draw image
      ctx.drawImage(img, 0, 0);
  
      // export base64
      callback(canvas.toDataURL());
    };
  
    img.src = srcBase64;
  }



  getOrientation(file, callback) {
    var reader = new FileReader();
    reader.onload = function(e:any) {
        var view = new DataView(e.target.result);
      if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
      var length = view.byteLength, offset = 2;
      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
          var little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
              return callback(view.getUint16(offset + (i * 12) + 8, little));
        }
        else if ((marker & 0xFF00) != 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file);
  }
}

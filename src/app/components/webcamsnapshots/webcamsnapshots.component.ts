import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T; 
  // probably you might want to add the currentTarget as well
  // currentTarget: T;
}
@Component({
  selector: 'app-webcamsnapshots',
  templateUrl: './webcamsnapshots.component.html',
  styleUrls: ['./webcamsnapshots.component.scss']
})

export class WebcamsnapshotsComponent {
  link = document.createElement('a');
  constructor(private http:HttpClient){
    
  } 
  
  WIDTH = 540;
  HEIGHT = 320;
  @Output()valueResponse:EventEmitter<boolean>=new EventEmitter();
  @Output()valuePicture:EventEmitter<File>=new EventEmitter();
  @Input ()activarCamera : boolean=false;
  @ViewChild("video")
  public video!: ElementRef; 
  @ViewChild("canvas")
  public canvas!: ElementRef;
data!:string;
  captures: string[] = [];
  error: any;
  isCaptured: boolean=true;
  isactive:boolean=false;
  namebtnactive:string='Activar'
  async ngOnChanges(){
    console.log('nuevos cambios') 
    if (this.activarCamera) {
      console.log('entre pana')
      await this.setupDevices();
    }else
    { 
      
    }
  } 
  //await this.setupDevices();
  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }
  downloadImage(url: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
        // Create a link element
        const file = new File([blob],'blob',{type:blob.type})
        this.link.href = URL.createObjectURL(blob);
        this.link.download = 'CoverImage.jpg'; // Set the download filename
        this.readFile(blob)
        this.valueResponse.emit(false);
        this.valuePicture.emit(file)

        // Append link to the body, click it, and then remove it
        // document.body.appendChild(this.link);
        // this.link.click();
        // document.body.removeChild(this.link);
    }, error => {
        console.error('Error downloading the image: ', error);
    });
  }
  readFile(input: Blob){
    const fr = new FileReader();
    fr.readAsDataURL(input);
    fr.addEventListener('load',()=>{
      const res = fr.result;
    })
  }
  capture() { 
    this.drawImageToCanvas(this.video.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    this.downloadImage(this.canvas.nativeElement.toDataURL("image/png"))
    this.isCaptured = true;

    

  }
  habilitarCamara() { 
    this.isactive=!this.isactive
    if (this.isactive) {
      this.namebtnactive='Desactivar'
      this.isCaptured = false;
    }
    else{
      this.namebtnactive='Activar'
      this.isCaptured = true;
    }

    

  }

  removeCurrent() {
    this.isCaptured = false;
  }

  setPhoto(idx: number) {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
      const ctx = this.canvas.nativeElement.getContext("2d")
    //   ctx.fillRect( 20, 20, 260, 110 );
  }

}

import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { Imagem } from './models/imagem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  constructor(private httpClient: HttpClient) { }

  imagens?: Imagem[];
  imagensAtt?: Imagem[];
  imagem?: Imagem = new Imagem();

  // armazena arquivo
  selectedFile?: File;
  
  message?: string;
  imageName: any;

  ngOnInit(): void {
    this.getImage();
  }
  
  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile!, this.selectedFile!.name);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData)
      .subscribe();
  }

    // retorno da imagem
    retrievedImage: any;
    base64Data: any;
    retrieveResonse: any;

    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get<Imagem[]>('http://localhost:8080/image/get')
      .subscribe(
        res => {
          this.imagensAtt = res;
          // console.log(this.imagensAtt)

          for (let image of this.imagensAtt) {
            console.log(image)
            image.picByte = 'data:image/jpeg;base64,' + image.picByte;

            // this.base64Data = image.picByte;
            // image.picByte = 'data:image/jpeg;base64,' + this.base64Data;
            // this.imagens!.push(image);
          }

          // aqui temos o objeto ImageModel vindo da API
          // this.retrieveResonse = res;

          // aqui temos os bytes da imagem
          // this.base64Data = this.retrieveResonse.picByte;

          // aqui temos a imagem em si concatenada entre a string do base64 e os bytes
          // isto que de fato tem de ser o professor.imagem e o curso.imagem
          // this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}

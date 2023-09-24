import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'maren-cloud',
    api_key: '623729681516771',
    api_secret: '88spKlOWoEQm7GsikPWKTJwjsqk',
    secure: true
})

describe('Pruebas en FileUpload', () => { 

    test('Debe de subir el archivo correctamente a cloudinary', async() => { 
        
        const imageUrl = 'https://media.istockphoto.com/id/517188688/es/foto/paisaje-de-monta%C3%B1a.jpg?b=1&s=170667a&w=0&k=20&c=Et_s6TPq65y2rUkCBNyv-w9Q8WxuMM2YmJl-LNnitSM=';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg','');

        const cloudResponse = await cloudinary.api.delete_resources(['journal/' + imageId],{
            resource_type: 'image',
        });

     });

     test('Debe de retornar null', async() => { 
        
        const file = new File([], 'foto.jpg')

        const url = await fileUpload( file );
        expect( url ).toBe( null );

      })

 });
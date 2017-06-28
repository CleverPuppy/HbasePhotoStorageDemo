window.onload = function () {

    var inputElement = document.getElementById('myfileinput'),
        preview = document.getElementById('preview'),
        submit = document.getElementById('submit');

    inputElement.addEventListener('change',handleFiles,false);
    submit.addEventListener('click',sendFiles,false);

    function handleFiles(){
        var fileList = this.files;
        var imageType=/image.*/;
        if(!fileList.length){
            preview.innerHTML='no images selected';
        }
        else{
            for(var i =0;i<fileList.length;i++){
                var file = fileList[i];

                if(!file.type.match(imageType)){
                    console.log('not a image');
                    continue;
                }

                var img = document.createElement('img');
                img.classList.add("img-preview");
                img.file = file;
                preview.appendChild(img);

                var reader = new FileReader();
                reader.onload = (function(aImg){
                    return function(e){
                        aImg.src = e.target.result;
                    };
                })(img);
                reader.readAsDataURL(file);
            }
        }
    }

    function sendFiles(evt){
        evt.preventDefault();
        var imgs = document.querySelectorAll('.img-preview');

        for(var i =0;i<imgs.length;i++){
            new FileUpload(imgs[i],imgs[i].file);
        }

    }

    function FileUpload(img,file){
        // var reader = new FileReader();
        // // this.ctrl = createThrobber(img);
        // // var xhr = new XMLHttpRequest();
        // // this.xhr=xhr;

        // var self = this;

        // this.xhr.upload.addEventListener('progress',function(e){
        //     if(e.lengthComputable){
        //         var percentage = Math.round((e.loaded*100)/e.total);
        //         self.ctrl.upload(percentage);
        //     }
        // },false);

        // xhr.upload.addEventListener('load',function(e){
        //     self.ctrl.update(100);
        //     var canvas = self.ctrl.ctx.canvas;
        //     canvas.parentNode.removeChild(canvas);
        // },false);

        // xhr.open('POST','update')
        // xhr.overrideMimeType('text/plain;charset=x-user-defined-binary');
        // reader.onload = function(evt){
        //     xhr.sendAsBinary(evt.target.result);
        // }
        // reader.readAsBinaryString(file);

        var reader = new FileReader();
        reader.onload = function(evt){
            $.post('upload',evt.target.result,function(data,status){
                alert('Data:'+data+"\nStatus:"+status);
            });
        }
        reader.readAsDataURL(file);
    }


}
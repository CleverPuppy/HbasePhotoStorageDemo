window.onload = function(){
    function dumpFile(){
        var imgs = document.querySelectorAll('.img-preview');
        for(var i=0;i<imgs.length;i++){
            getFile(imgs[i],imgs[i].getAttribute('file'));
        }
    }

    function getFile(img,acol){
        $.get("dump",{row:'test',col:acol},function(data,status){
            img.src=data;
        });
    }
    dumpFile();
}
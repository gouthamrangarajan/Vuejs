const express = require ('express')
const path = require('path')
const app =express()
const fs=require('fs')
const fileUpload = require('express-fileupload');

const port=process.env.PORT||3000
app.use(fileUpload({
    limits: { fileSize: 7 * 1024 * 1024 },
  }));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'client/dist/index.html'));
})
app.get('/imgs/total',(req,res)=>{  
    fs.readdir(__dirname+'/imgs',(err,files)=>{                      
        res.json(files.length);
    });
})
app.get('/imgs/modified',(req,res)=>{
    var modified=[];
    fs.readdir(__dirname+'/imgs',(err,files)=>{              
        var len=files.length;
        var ind=0;
        files.forEach(fl=>{
            let stats=fs.statSync(__dirname+'/imgs/'+fl);            
            let fileId=fl.replace(path.extname(fl),"");                                     
            if(stats&&stats.mtime){
                modified.push({modified:stats.mtime,fileId});
            }
            ind++;
            if(ind==len)
            res.json(modified);              
        });      
    });
})
app.get('/imgs/:id',(req,res)=>{    
    let id=req.params.id;
    if(id<1)
        res.status(400).json('Image not found');
    res.sendFile(path.join(__dirname+'/imgs/'+id+'.jpg'));
})

app.get('/*',(req,res)=>{
    let srcPath=req.params[0];   
    let availTypes=[".css",".js",".ico"];
    let srcPathextn=path.extname(srcPath.toLowerCase());
    if(availTypes.includes(srcPathextn)){        
        res.sendFile((path.join(__dirname+'/client/dist/'+srcPath)));
    }
    else{        
        res.sendFile((path.join(__dirname+'/client/dist/index.html')));
    }
})
app.delete('/imgs/:id',(req,res)=>{
    let id=req.params.id;
    let location=path.join(__dirname+'/imgs/'+id+'.jpg');
    fs.unlink(location, (err) => {
        if (err) {
            res.status(500).json('Error');
        }
        else{
            let errorRetry=0;
            fs.readdir(__dirname+'/imgs',(err,files)=>{                                      
                let errored=false;
                let ind=1;
                while(errorRetry<3){
                    errored=false;
                    ind=1;
                    files.forEach(fl=>{                    
                        try{
                            fs.renameSync(__dirname+'/imgs/'+fl, __dirname+'/imgs/'+ind+'.jpg');
                        }
                        catch(err){                                                  
                            console.log('ERROR: ' + err);
                            errorRetry++;
                            errored=true;                            
                        }
                        ind++;                 
                    });
                    if(errored==false){
                        errorRetry=4;
                    }                    
                }
            });   
            //file removed
            res.json('Image removed.');         
        }     
    });            
})
app.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json('No files were uploaded.');
    }  
    // The name of the input field (i.e. "myImage") is used to retrieve the uploaded file
    let fl = req.files.myImage;   
    let validTypes=[".jpg",".jpeg",".gif",".png"];
    if(!validTypes.includes(path.extname(fl.name.toLowerCase()))){
        return res.status(400).json('Invalid file type.');
    }    
    if(fl.size>7340032){
        return res.status(400).json("Invalid file size.");
    }
    // Use the mv() method to place the file somewhere on your server
    fs.readdir(__dirname+'/imgs',(err,files)=>{              
        var len=files.length;
        len++;
        fl.mv(__dirname+'/imgs/'+len+'.jpg', function(err) {
            if (err)
              return res.status(500).send(err);
        
            res.json('File uploaded!');
          });
    });    
  });
app.listen(port,()=>console.log(`listening on port ${port}`))
/**
 * loading client # redis #
 */
const client = require('./src/dbRedis/dbConnect');



exports.ifExists =(req,res,next)=>{
    const { hash } = req.params;
    const key = hash+":"+req.ip;
    console.log('key: ' + key);

    client.exists(key,(err,reply)=>{
        if(err){
            res.status(500).end(JSON.stringify(err));
        }else{
            console.log('exists : ' + reply);
            req.x = reply;
            next();
        }
    })
}

exports.exp = (req,res)=>{
    const { hash } = req.params;
    const key = hash+":"+req.ip;
    const seconds = 120;
    client.setex(key,seconds,1,(err,reply)=>{
        red(req,res,hash);
    });
}


 function checkIncrement(req,res,key){
    const { hash } = req.params;
    console.log('here');

 client.incr(key,(err,reply)=>{
        console.log('inc : ' + reply);
        if(err) res.status(500).end(JSON.stringify(err));
        else{
        if(reply > 10)
            res.status(429).send('<h1>Too many request from this IP, please try again after couple minutes</h1>');
        else
            red(req,res,hash);          
        }
    });
}

function red(req,res,hash){
    client.hgetall(hash, function (err, obj) {
        //console.dir(obj);
    if(err)
        res.status(401).end('err: '+ err);
    else if(obj != null)
        res.status(302).redirect(obj.real_url);
    else
        res.status(404).end();
     });
}

exports.checkIf = (req,res,next)=>{
    const { hash } = req.params;
    const key = hash+":"+req.ip;
    if(req.x == 1){
        console.log('[what]')
        checkIncrement(req,res,key);        
    }else{
        next();
    }
}
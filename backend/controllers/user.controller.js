const Validator = require('fastest-validator');
const bcryptjs = require('bcryptjs');
const model = require('../models');

function register(req,res)
{
    
    model.User.findOne({where:{email:req.body.email,mobile_no:req.body.mobile_no}}).then(result =>{
        if(result !== null)
        {
            res.sendResponse(409,{},'Already a user exists with the given data',[]);
        }
        else
        {
            const userDetails = {
                name:req.body.name,
                email:req.body.email,
                mobile_no:req.body.mobile_no,
                password:req.body.password,
            }

            const v = new Validator();

            const schema = {
                name:{type:"string",optional:false,max: 20},
                email:{type:"string",optional:false,max: 20},
                mobile_no:{type:"number",optional:false,length: 10},
            }

            const validatorResponse = v.validate(userDetails,schema);

            if(validatorResponse !== true)
            {
                return res.sendResponse(400,{},'validation errors',validatorResponse);
            }

            bcryptjs.genSalt(10,(err,salt) => {
                
                if(err)
                {
                    return res.sendResponse(500,{},err.message,err);
                }

                bcryptjs.hash(req.body.password,salt,(err,hashedPassword) => {

                    if(err)
                    {
                        return res.sendResponse(500,{},err.message,err);
                    }

                    userDetails.password = hashedPassword;
                    
                    model.User.create(userDetails).then(result => {
                        res.sendResponse(201,result,'Registration successful',[]);
                    }).catch(error => {
                        res.sendResponse(500,{},'Unable to register user',error);
                    });
                })
            });
            
        }
    }).catch(error => {
        res.sendResponse(500,{},'Unable to Handle Server Request',[error]);
    })
}

module.exports = {
    register : register
}
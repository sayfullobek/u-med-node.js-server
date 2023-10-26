const {Diseases} = require('../models')

exports.getAll = async (req, res) => {
    try{
        const get = await Diseases.find().populate('name');
        res.status(200).json({getAll:get})
    }catch(err){
        resizeBy.status(500).json({
            err:err.message
        })
    }
}

exports.create = async (req, res) => {
    try{
        const {name} = req.body;
        const diseases = await Diseases.findOne({name:name});
        if (diseases) res.status(409).json({message:'Bunday kassallik avvaldan mavjud'})
        const newDis = await Diseases.create(req.body)
        res.status(200).json({newDis, message:'Muvaffaqiyatli saqlandi'});
    }catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

exports.update = async (req, res) => {
    try{    
        const dis = await Diseases.findById(req.params.id);
        if (!dis) res.status(404).json({message:"Bunday kasallik mavjud emas"});
        const name = req.body.name;
        const updateDis = await Diseases.findByIdAndUpdate(dis._id, { name }, {new : true})
        res.status(201).json({updateDis, message:"Taxrirlandi"})
    }catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

exports.delete = async (req, res) => {
    try{
        const dis = await Diseases.findById(req.params.id);
        if (!dis) res.status(404).json({message:"Bunday kasallik mavjud emas"});
        await dis.remove();
        res.status(200).json({message:"O'chirildi"});
    }catch(err){
        res.status(500).json({err:err.message});
    }
}
import CodeDraft from '../Model/CodeDraftSchema.js'

const getuserdraftcode=async(req,res)=>{
    const {id}=req.user;
    const {problemId}=req.params;
    const{language}=req.body;
    if(!id||!problemId||!language){
        return res.json({code:''});
    }
    try{
        const draft=await CodeDraft.findOne({id,problemId,language});
        if(!draft)return res.json({code:''});
        res.json({code:draft.code});
    }
    catch(err){
        return res.status(500).json({err:err,msg:'failed to get code draft'});
    }

}
export default getuserdraftcode;
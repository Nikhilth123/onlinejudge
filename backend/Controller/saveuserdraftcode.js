import CodeDraft from '../Model/CodeDraftSchema.js';

const saveuserdraftcode = async (req, res) => {
    const{id}=req.user;
    const {problemId}=req.params;
    const {language, code } = req.body;
    
    if(!id||!problemId||!language||!code){
        return res.status(400).json({error:'missing fields'});
    }

    try{
         const draft = await CodeDraft.findOneAndUpdate(
      { userId:id, problemId, language },
      { code, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ message: 'Draft saved successfully', draft });

    }
    catch(err){
         console.error(err);
    res.status(500).json({ error: 'Failed to save draft' });
    }
}

export default saveuserdraftcode;
import dotenv from 'dotenv'
import { GoogleGenAI } from "@google/genai";
dotenv.config();


const ai = new GoogleGenAI({apikey:process.env.GEMINI_API_KEY});

const useai = async (req, res) => {
    const { question, code, task, language = 'cpp', error } = req.body;

    let prompt = '';
    switch (task) {
        case 'hints':
            if (!question) return res.status(400).json({ msg: 'provide question for hints' });
            prompt = `please provide me some hints i am stucked in this problem in brief way not detail explanation only some hints to start :\n${question}`
            break;
        case 'boilerplate':
            if (!language || !question) return res.status(400).json({ msg: 'provide problem and language for boiler plate' })
            prompt =  `genetate a basic simple boiler palte in ${language} for this problem\n${question}only give header file and input dont give logic and only code`;

            break;
        case 'codeexplanation':
            if (!code) return res.status(400).json({ msg: 'provide for getting code explantaion' })
            prompt = `explain this ${code} in brief way assume user has basic knowledge of language `
            break;
        case 'whyerror':
            if (!code) return res.status(400).json({ msg: 'provide  code for detecting error and explain' })
            prompt = `why i am getting this error explain in breif way \n error: ${error} \n\n code:${code}`;
            break;
        case 'code optimization':
            if (!code) return res.status(400).json({ msg: 'provide code for optimization' })
            prompt = `please optimize my code\n${code}`;
            break;
    }
    try {
   

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  console.log(response.text);


    
       
        return res.status(200).json(response.text);

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'error in fetching gemini api', err });

    }


}
export default useai
import fetch from 'node-fetch'

const useai = async (req, res) => {
    const { question, code, task, language = 'cpp', error } = req.body;

    let prompt = '';
    switch (task) {
        case 'hints':
            if (!question) return res.status(400).json({ msg: 'provide question for hints' });
            prompt = `please provide me some hints i am stucked in this problem :\n${question}`
            break;
        case 'boilerplate':
            if (!language || !question) return res.status(400).json({ msg: 'provide problem and language for boiler plate' })
            prompt =  `genetate a basic simple boiler palte in ${language} for this problem\n${question} just write headerfiles and dont write comments and also not take input it will taken by user and also not write logic `;

            break;
        case 'codeexplanation':
            if (!code) return res.status(400).json({ msg: 'provide for getting code explantaion' })
            prompt = `explain this ${code} step by step in brief manner assume user has basic knowledge`
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
        const response = await fetch(`http://localhost:11434/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt,
                model: 'codellama:7b-instruct',
                stream: false

            })
        })
console.log('nk',response);
        if (!response.ok) {
            const result = await response.json();
            console.log('codallama api error')
            return res.status(500).json({ msg: 'error in fetching codellma api', err: result.error });

        }
       const result = await response.json();
       console.log(result);
        return res.status(200).json(result.response);

    }
    catch (err) {
        console.log('server')
        return res.status(500).json({ msg: 'error in fetching codellma api', err });

    }


}
export default useai
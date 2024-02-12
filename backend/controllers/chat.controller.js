const { ChatGoogleGenerativeAI } = require('@langchain/google-genai')

const welcome = (req, res) => {
    res.status(200).send('Hello World!')
}

const auth = async (req, res) => {
    try {
        const model = new ChatGoogleGenerativeAI({
            modelName: "gemini-pro",
            maxOutputTokens: 1,
            apiKey: req.body.token
        });

        // Batch and stream are also supported
        const response = await model.invoke([
            [
                "human",
                "Hello World!",
            ],
        ]);

        return res.status(200).json({ message: 'Authorized Successfully' })
    } catch (err) {
        console.error(err)
        return res.status(401).json({ message: err.message })
    }
}

module.exports = { welcome, auth }
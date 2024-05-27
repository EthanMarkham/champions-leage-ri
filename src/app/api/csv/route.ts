import { IncomingForm, Fields, Files } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm();

  form.parse(req, (err: any, fields: Fields, files: Files) => {
    if (err) {
      res.status(500).json({ error: "Error parsing files" });
      return;
    }

    // Handle the uploaded file and other form data
    const file = files.file;
    const title = fields.title;
    const text = fields.text;
    const url = fields.url;

    // Do something with the file, title, text, and url
    res.status(200).json({ message: "File uploaded successfully" });
  });
};

export default handler;

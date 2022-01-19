import fs from "fs/promises";
import path from "path";
// curl -X POST https://vt9cb.sse.codesandbox.io/api/submit -H 'Content-Type: application/json' -d '{"address":"my_address"}'

export default async function handler(req, res) {
  console.log("req", req.body);

  const { address } = req.body;

  if (!/addr1[a-z0-9]{98}/i.test(address)) {
    res.status(422).json({ error: "Wrong format" });
  }

  await fs.appendFile(
    path.join(__dirname, "..", "..", "..", "..", "data", "addresses.txt"),
    address
  );

  res.status(200).json({ text: "Hello" });
}

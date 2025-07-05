function formatpythonerror(stderr) {
  const lines = stderr.split("\n");
  let result = "";

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/File "(.+)", line (\d+), .*/);
    if (match && lines[i + 1]) {
      const [, file, lineNum] = match;
      const messageLine = lines[i + 1].trim(); 
      result += `Line ${lineNum}: ${messageLine}\n`;
    }
  }

  return result.trim() || stderr;
}
export default formatpythonerror
function formatjavaerror(stderr) {
  const lines = stderr.split("\n");
  const result = [];

  for (let line of lines) {
    const match = line.match(/([^\s]+\.java):(\d+): error: (.+)/);
    if (match) {
      const [, file, lineNum, message] = match;
      result.push(`Line ${lineNum}: error: ${message}`);
    }
  }

  return result.join("\n") || stderr;
}
export default formatjavaerror
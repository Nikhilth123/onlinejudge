function formatcerror(stderr) {
  const lines = stderr.split("\n");
  const result = [];

  for (let line of lines) {
    const match = line.match(/(.+\.c):(\d+):(\d+): (error|warning): (.+)/);
    if (match) {
      const [, file, lineNum, colNum, type, message] = match;
      result.push(`Line ${lineNum}, Col ${colNum}: ${type}: ${message}`);
    }
  }

  return result.join("\n") || stderr;
}
export default formatcerror;
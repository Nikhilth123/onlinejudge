function formatjavascripterror(stderr) {
  const match = stderr.match(/main\.js:(\d+):(\d+)/);
  const messageMatch = stderr.match(/(ReferenceError|SyntaxError|TypeError): (.+)/);

  if (match && messageMatch) {
    const [, lineNum, colNum] = match;
    const [, type, message] = messageMatch;
    return `Line ${lineNum}, Col ${colNum}: ${type}: ${message}`;
  }

  return stderr;
}
export default formatjavascripterror
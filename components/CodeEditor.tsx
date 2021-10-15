import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';

const initialValue = `// This will run only once
const setup => {

};

// This will run on every loop
const loop = {

};`;

const CodeEditor = () => {
  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      width="100%"
      showPrintMargin={false}
      value={initialValue}
    />
  );
};

export default CodeEditor;
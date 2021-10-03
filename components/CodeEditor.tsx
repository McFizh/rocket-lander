import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';

const CodeEditor = () => {
  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
    />
  );
};

export default CodeEditor;
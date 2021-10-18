import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';

const initialValue = `// This code is executed on every frame
// The following values are available:
// fuel_level (0-100)
// height (0 - 5000)
//
// Return value should be throttle level in range of 0-10
const throttle = 5;

return throttle;`;

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
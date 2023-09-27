import { Simulate } from 'react-dom/test-utils';
import getWords from './lib/getWords';
import setCountRows from './lib/setCountRows';
import error = Simulate.error;

(async () => {
    await setCountRows();
    const words = await getWords();
    await fetch('http://localhost:8000/words', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(words),
    });
})();

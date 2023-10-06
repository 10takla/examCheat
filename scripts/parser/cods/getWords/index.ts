import getWords from './lib/getWords';
import setCountRows from './lib/setCountRows';

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

    console.log('ScriptCompleted');
})();

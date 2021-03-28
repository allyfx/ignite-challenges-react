import { useEffect } from 'react';

export function Comments(): JSX.Element {
  useEffect(() => {
    const script = document.createElement('script');
    const anchor = document.getElementById('inject-comments-for-uterances');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    script.setAttribute('repo', 'allyfx/challenge-six-comments');
    script.setAttribute('issue-term', 'url');
    script.setAttribute('theme', 'github-dark');
    anchor.appendChild(script);
  }, []);
  return <div id="inject-comments-for-uterances" />;
}

import { useState } from 'react';

/**
 * A lead magnet section's text, rendered without HTML.
 *
 * The format is deliberately tiny: blank lines between paragraphs, `- ` for
 * bullets, `- [ ] ` for checklist items and `**bold**`. Everything becomes
 * React elements, so nothing in the file can inject markup or script.
 */

function Inline({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
      <strong key={index} className="font-semibold text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

function CheckItem({ text }) {
  const [done, setDone] = useState(false);
  return (
    <li className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={done}
        onChange={(event) => setDone(event.target.checked)}
        className="mt-1.5 h-4 w-4 shrink-0 accent-[#8df6ff]"
        aria-label={text.replace(/\*\*/g, '')}
      />
      <span className={done ? 'text-white/40 line-through' : undefined}>
        <Inline text={text} />
      </span>
    </li>
  );
}

/** Splits text into paragraphs and lists, keeping a list's lines together. */
function blocks(body) {
  const result = [];
  for (const chunk of body.replace(/\r\n/g, '\n').split(/\n\s*\n/)) {
    const lines = chunk.split('\n').map((line) => line.trim()).filter(Boolean);
    let paragraph = [];
    const flush = () => {
      if (paragraph.length) result.push({ kind: 'p', text: paragraph.join(' ') });
      paragraph = [];
    };
    for (const line of lines) {
      const check = /^[-*]\s+\[\s?[xX ]?\]\s+(.*)$/.exec(line);
      const bullet = /^[-*•]\s+(.*)$/.exec(line);
      const kind = check ? 'check' : bullet ? 'ul' : undefined;
      if (!kind) {
        paragraph.push(line);
        continue;
      }
      flush();
      const last = result[result.length - 1];
      const item = (check ?? bullet)[1];
      if (last && last.kind === kind) last.items.push(item);
      else result.push({ kind, items: [item] });
    }
    flush();
  }
  return result;
}

const LeadMagnetBody = ({ body }) => (
  <div className="space-y-4 text-lg leading-8 text-white/75">
    {blocks(body).map((block, index) => {
      if (block.kind === 'p') {
        return (
          <p key={index}>
            <Inline text={block.text} />
          </p>
        );
      }
      if (block.kind === 'check') {
        return (
          <ul key={index} className="space-y-3">
            {block.items.map((item, at) => (
              <CheckItem key={at} text={item} />
            ))}
          </ul>
        );
      }
      return (
        <ul key={index} className="list-disc space-y-2 pl-6 marker:text-[#8df6ff]">
          {block.items.map((item, at) => (
            <li key={at}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    })}
  </div>
);

export default LeadMagnetBody;

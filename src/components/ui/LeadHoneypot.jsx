/**
 * A field people never see or reach, for bots that fill in every input.
 * The backend quietly drops any submission that has it filled.
 */
const LeadHoneypot = () => (
  <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
    <label>
      Leave this empty
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" defaultValue="" />
    </label>
  </div>
);

export default LeadHoneypot;

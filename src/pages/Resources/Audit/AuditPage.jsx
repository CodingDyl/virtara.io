import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { submitAuditBooking } from '../../../config/firebase';
import PageShell from '../../../components/layout/PageShell';
import PageHero from '../../../components/layout/PageHero';
import Button from '../../../components/ui/Button';

const AuditPage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    additionalWebsites: '',
    preferredDate: '',
    preferredTime: '',
    meetingPlatform: 'teams',
    additionalNotes: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    message: '',
    isError: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, message: '', isError: false });

    try {
      const result = await submitAuditBooking(formData);
      
      if (result.success) {
        setSubmitStatus({
          loading: false,
          message: 'Thank you! Your audit booking has been submitted successfully.',
          isError: false
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          website: '',
          additionalWebsites: '',
          preferredDate: '',
          preferredTime: '',
          meetingPlatform: 'teams',
          additionalNotes: ''
        });
        navigate('/resources/audit/thank-you');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setSubmitStatus({
        loading: false,
        message: error.message || 'Something went wrong. Please try again.',
        isError: true
      });
    }
  };

  return (
    <PageShell>
      <Helmet>
        <title>Website Audit Booking | Virtara</title>
        <meta name="description" content="Book your personalized website audit session with our experts and get detailed insights to improve your website's performance." />
        <link rel="canonical" href="https://virtara.co.za/resources/audit" />
      </Helmet>

      <PageHero
        announcement={{ label: '30-minute expert session' }}
        title="Book your website audit session."
        lead="Let's analyse your website and create a custom plan to boost your conversions."
      />

      <section className="pb-24 md:pb-32" aria-label="Booking form">
        <div className="shell max-w-3xl">
          <div className="rounded-card border border-edge bg-charcoal shadow-frame">
            <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="field-label">Full name</label>
                  <input type="text" id="name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} className="field-input" required />
                </div>
                <div>
                  <label htmlFor="email" className="field-label">Email address</label>
                  <input type="email" id="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} className="field-input" required />
                </div>
              </div>
              <div>
                <label htmlFor="website" className="field-label">Primary website to audit</label>
                <input type="url" id="website" name="website" placeholder="https://example.co.za" value={formData.website} onChange={handleChange} className="field-input" required />
              </div>
              <div>
                <label htmlFor="additionalWebsites" className="field-label">Additional website links <span className="text-quiet">(optional)</span></label>
                <input
                  type="text"
                  id="additionalWebsites"
                  name="additionalWebsites"
                  placeholder="Add any additional URLs, separated by commas"
                  value={formData.additionalWebsites}
                  onChange={handleChange}
                  aria-describedby="additionalWebsites-hint"
                  className="field-input"
                />
                <p id="additionalWebsites-hint" className="field-hint">E.g. competitor websites or other sites you'd like us to reference.</p>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label htmlFor="preferredDate" className="field-label">Preferred date</label>
                  <input type="date" id="preferredDate" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className="field-input [color-scheme:dark]" required />
                </div>
                <div>
                  <label htmlFor="preferredTime" className="field-label">Preferred time</label>
                  <input type="time" id="preferredTime" name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="field-input [color-scheme:dark]" required />
                </div>
                <div>
                  <label htmlFor="meetingPlatform" className="field-label">Platform</label>
                  <select id="meetingPlatform" name="meetingPlatform" value={formData.meetingPlatform} onChange={handleChange} className="field-input [&>option]:bg-charcoal">
                    <option value="teams">Microsoft Teams</option>
                    <option value="zoom">Zoom</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="additionalNotes" className="field-label">Additional notes</label>
                <textarea id="additionalNotes" name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows="4" className="field-input resize-y" />
              </div>

              {submitStatus.message && (
                <p
                  role={submitStatus.isError ? 'alert' : 'status'}
                  className={submitStatus.isError
                    ? 'rounded-control border border-critical/25 bg-critical/10 px-4 py-3 text-nav font-normal text-critical'
                    : 'rounded-control border border-positive/25 bg-positive/10 px-4 py-3 text-nav font-normal text-positive'}
                >
                  {submitStatus.message}
                </p>
              )}

              <Button type="submit" size="lg" loading={submitStatus.loading} className="w-full font-semibold">
                {submitStatus.loading ? 'Submitting…' : 'Book my audit session'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default AuditPage;
